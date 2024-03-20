const Visit = require("../models/Visit");

const doctorDashboard = async (req, res) => {
    let { currentDate } = req.body;
    if(!currentDate) {
        currentDate = new Date();
    }
    currentDate = new Date(currentDate);
    const doctorId = req.userId;
    const visits = await Visit.find({ doctor: doctorId }).sort({ "slot.startTime": 1 }).populate("patient");
    const currentVisit = visits.find(visit => {
        return currentDate >= visit.slot.startTime && currentDate <= visit.slot.endTime;
    });
    res.status(200).json({ visits, success: true, currentVisit });
}

module.exports = doctorDashboard;