const express = require('express');
const { otpVerificationTo, adminOtpSend } = require('../constrollers/adminOtpControllers');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();
router.route('/admin-otp-send').post(protect,adminOtpSend)
router.route('/admin-otp-verify').post(protect,otpVerificationTo)
module.exports = router;