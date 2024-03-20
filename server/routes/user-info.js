const express = require('express');
const auth = require('../middleware/auth');
const userInfo = require('../controllers/userinfo');
const router = express.Router();

router.get('/', auth, userInfo);

module.exports = router;