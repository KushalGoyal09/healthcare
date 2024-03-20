const express = require('express');
const router = express.Router();
const chat = require('../controllers/chat');
const authorizePatient = require('../middleware/auth-patient');

router.post('/', authorizePatient , chat);

module.exports = router;