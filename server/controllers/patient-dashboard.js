const Visit = require("../models/Visit");

const patientDashboard = async (req, res) => {
    let { currentDate } = req.body;
    if (!currentDate) {
        currentDate = new Date();
    }
    currentDate = new Date(currentDate);
    const patientId = req.userId;
    const visits = await Visit.find({ patient: patientId }).sort({ "slot.startTime": 1 }).populate('doctor');
    const currentVisit = visits.find(visit => {
        return currentDate >= visit.slot.startTime && currentDate <= visit.slot.endTime;
    });
    res.status(200).json({ visits, success: true, currentVisit });
}

module.exports = patientDashboard;