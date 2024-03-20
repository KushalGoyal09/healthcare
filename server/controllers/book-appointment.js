const Patient = require("../models/Patient");
const Doctor = require("../models/Doctor");
const Visit = require("../models/Visit");
const Razorpay = require('razorpay');
require('dotenv').config();

const razorpay = new Razorpay({
    key_id: process.env.RAJORPAY_API_KEY,
    key_secret: process.env.RAJORPAY_API_SECRET
});

const bookAppointment = async (req, res) => {
    const { userId } = req;
    const { doctor_id, startTime, endTime } = req.body;
    const doctor = await Doctor.findById(doctor_id);
    const fees = doctor.price;
    const isAvailable = await Visit.findOne({ doctor: doctor_id, 'slot.startTime': startTime, 'slot.endTime': endTime });
    if (isAvailable) {
        return res.status(400).json({ message: 'Slot not available', success: false });
    }
    const isPatientAvailable = await Visit.findOne({ patient: userId, 'slot.startTime': startTime, 'slot.endTime': endTime });
    if (isPatientAvailable) {
        return res.status(400).json({ message: 'You already have an appointment at this time', success: false });
    }
    const visit = await Visit.create({
        doctor: doctor_id,
        patient: userId,
        slot: {
            startTime: startTime,
            endTime: endTime
        }
    });
    const order = await razorpay.orders.create({
        amount: fees,
        currency: 'INR',
        receipt: 'order_rcptid_11'
    });
    await Doctor.findByIdAndUpdate(doctor_id, {
        $push: { visits: visit._id }
    })
    await Patient.findByIdAndUpdate(userId, {
        $push: { visits: visit._id }
    })
    res.status(201).json({ visit, success: true, order });
}

module.exports = bookAppointment;