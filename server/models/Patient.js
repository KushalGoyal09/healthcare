const { Schema, model, mongo } = require('mongoose');

const patientSchema = new Schema({
    auth0_id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    visits: [{
        type: Schema.Types.ObjectId,
        ref: 'Visit'
    }],
    medicalDetails: {
        type: String,
        required: true
    }
});

patientSchema.virtual('age').get(function () {
    const today = new Date();
    const birthDate = new Date(this.dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
});

const Patient = model('Patient', patientSchema);

module.exports = Patient;