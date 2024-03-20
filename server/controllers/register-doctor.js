const Doctor = require("../models/Doctor");

const registerDoctor = async (req, res) => {
    const { auth0_id, name, specialization, expertise, experience, price, preferredTime } = req.body;
    const doctor = await Doctor.create({
        auth0_id,
        name,
        specialization,
        expertise,
        experience,
        price,
        preferredTime
    });
    res.json({ message: 'Doctor Registered Successfully', doctor });
}

module.exports = registerDoctor;