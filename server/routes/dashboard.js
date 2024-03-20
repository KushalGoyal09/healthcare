const express = require('express');
const doctorDashboard = require('../controllers/doctor-dashboard');
const authorizeDoctor = require('../middleware/auth-doctor');
const authorizePatient = require('../middleware/auth-patient');
const patientDashboard = require('../controllers/patient-dashboard');
const router = express.Router();

router.post('/doctor', authorizeDoctor, doctorDashboard);
router.post('/patient', authorizePatient, patientDashboard);

module.exports = router;