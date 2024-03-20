const { throwUnauthorizedError } = require('../error/custom-Error');
const Patient = require('../models/Patient');

const authorizePatient = async (req, res, next) => {
    const auth0_id = req.headers.authorization;
    if (!auth0_id) {
        throwUnauthorizedError('No token provided');
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

module.exports = authorizePatient;