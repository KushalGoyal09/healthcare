const express = require('express');
const registerDoctor = require('../controllers/register-doctor');
const registerPatient = require('../controllers/register-patient');
const router = express.Router();

router.post('/doctor', registerDoctor);
router.post('/patient', registerPatient);

module.exports = router;