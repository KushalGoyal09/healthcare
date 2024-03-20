const express = require('express');
const doctorDetail = require('../controllers/doctor-detail');
const authorizePatient = require('../middleware/auth-patient');
const router = express.Router();

router.post('/:doctorId', authorizePatient, doctorDetail);

module.exports = router;