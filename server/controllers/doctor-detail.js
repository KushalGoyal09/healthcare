const Doctor = require('../models/Doctor');
const { z } = require('zod');
const Visit = require('../models/Visit');

const doctorDetail = async (req, res) => {
    const { doctorId } = req.params;
    const { date } = req.body;
    let dateValue;
    if (date) {
         dateValue = new Date(date).toLocaleDateString();
    } else {
         dateValue = new Date().toLocaleDateString();
    }
    const doctor = await Doctor.findById(doctorId).select('-auth0_id -rating');

    const startTime = doctor.preferredTime.startTime;   // HH:MM
    const endTime = doctor.preferredTime.endTime;       // HH:MM
    const duration = doctor.preferredTime.duration;     // in minutes

    const startDate = new Date(`${dateValue} ${startTime}`);
    const endDate = new Date(`${dateValue} ${endTime}`);

    const slots = [];

    let currentTime = startDate;
    while (currentTime < endDate) {
        const slotEndTime = new Date(currentTime.getTime() + duration * 60000); // Convert duration to milliseconds
        const slot = {
            startTime: currentTime,
            endTime: slotEndTime
        };
        const visit = await Visit.findOne({ doctor: doctorId, 'slot.startTime': currentTime, 'slot.endTime': slotEndTime });
        if (visit) {
            slot.status = "Not Available";
        } else {
            slot.status = "Available";
        }
        slots.push(slot);
        currentTime = slotEndTime;
    }
    res.status(200).json({ doctor, slots, success: true });
}

module.exports = doctorDetail;