const express = require('express');
const authorizePatient = require('../middleware/auth-patient');
const bookAppointment = require('../controllers/book-appointment');
const router = express.Router();

router.post('/', authorizePatient, bookAppointment);

module.exports = router;