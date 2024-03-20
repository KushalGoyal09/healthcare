const Patient = require("../models/Patient");
const backendBaseUrl = 'http://localhost:3000';

const registerPatient = async (req, res) => {
    const { auth0_id, name, dateOfBirth, medicalDetails } = req.body;
    const patient = await Patient.create({
        auth0_id,
        name,
        dateOfBirth,
        medicalDetails
    });
    res.json({ message: 'Patient Registered Successfully', patient });

}

module.exports = registerPatient;