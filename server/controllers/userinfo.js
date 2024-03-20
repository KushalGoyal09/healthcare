const Doctor = require("../models/Doctor");
const Patient = require("../models/Patient");

const userInfo = async (req, res) => {
    const { role, userId } = req;
    if (role === 'doctor') {
        const doctor = await Doctor.findById(userId).select('name specialization expertise');
        res.json({ doctor, success: true , role: 'doctor' });
        return;
    }
    const patient = await Patient.findById(userId).select('name');
    res.json({ patient, success: true, role: 'patient'});
}

module.exports = userInfo;