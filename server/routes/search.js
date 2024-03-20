const express = require('express');
const searchDoctor = require('../controllers/search-doctor');
const authorizePatient = require('../middleware/auth-patient');
const router = express.Router();

router.post('/', authorizePatient ,searchDoctor);

module.exports = router;