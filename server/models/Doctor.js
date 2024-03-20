const { Schema, model } = require('mongoose');
const { z } = require('zod');
const validateTimeFormat = (value) => {
    const timeRegex = /^(?:[01]\d|2[0-3]):(?:[0-5]\d)$/;
    return timeRegex.test(value);
};

const doctorSchema = new Schema({
    auth0_id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    specialization: {
        type: String,
        required: true
    },
    expertise: {
        type: String,
        required: true
    },
    experience: {
        type: Number,
        required: true
    },
    visits: [{
        type: Schema.Types.ObjectId,
        ref: 'Visit'
    }],
    rating: [{
        type: Number,
        max: 5,
        min: 0
    }],
    averageRating: {
        type: Number,
        max: 5,
        min: 0
    },
    price: {
        type: Number,
        required: true
    },
    preferredTime: {
        startTime: {
            type: String,
            required: true,
            validate: {
                validator: validateTimeFormat,
                message: 'Invalid time format'
            }
        },
        endTime: {
            type: String,
            required: true,
            validate: {
                validator: validateTimeFormat,
                message: 'Invalid time format'
            }
        },
        duration: {
            type: Number,
            required: true
        }
    }
});

doctorSchema.pre('save', function (next) {
    if (this.rating && this.rating.length > 0) {
        const sum = this.rating.reduce((total, rating) => total + rating, 0);
        this.averageRating = sum / this.rating.length;
    } else {
        this.averageRating = 0;
    }
    next();
});

const Doctor = model('Doctor', doctorSchema);

module.exports = Doctor;