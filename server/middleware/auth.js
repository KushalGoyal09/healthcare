const { throwUnauthorizedError } = require('../error/custom-Error');
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');

const auth = async (req, res, next) => {
    const auth0_id = req.headers.authorization;
    if (!auth0_id) {
        throwUnauthorizedError('No token provided');
    }
    const doctor = await Doctor.findOne({ auth0_id });
    if(doctor) {
        req.role = 'doctor';
        req.userId = doctor._id;
        next();
        return;
    }
    const patient = await Patient.findOne({auth0_id});
    if(patient) {
        req.role = 'patient';
        req.userId = patient._id;
        next();
        return;
    }
    throwUnauthorizedError('Invalid token');
}

module.exports = auth;