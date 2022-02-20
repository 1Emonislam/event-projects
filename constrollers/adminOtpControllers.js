const User = require('../models/userModel');
const { sendOtpVia, verifyOtp } = require('../utils/otp');
const asyncHandler = require('express-async-handler');
const generateToken = require('../utils/generateToken');
const adminOtpSend = asyncHandler(async (req, res) => {
    const user = await User.findOne({ _id: req.user._id, isAdmin: true });
    if (!user) {
        return res.status(404).json({ "error": "admin permission required! please contact us administrator!" });
    } else if (user) {
        const otpsend = await sendOtpVia(user.phone);
        //    console.log(otpsend.sent)
        if (otpsend.sent) {
            return res.status(200).json({ "message": "otp sending successfully!." })
        } else {
            return res.status(400).json({ "error": "otp send failed!." })
        }
    }
})
const otpVerificationTo = asyncHandler(async (req, res) => {
    const user = await User.findOne({ _id: req.user._id, isAdmin: true });
    const { otp } = req.body;
    if (!user) {
        return res.status(404).json({ "error": "admin permission required! please contact us administrator!" });
    } else {
        try {
            const verified = await verifyOtp(req.user.phone, otp);
            if (!verified) {
                res.status(401).json({ "error": "otp veryfication failed" });
            } else {
                const user = await User.findById(req.user._id);
                const userBody = {
                    _id: user._id,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    verify: user.verify,
                    email: user.email,
                    gender: user.gender,
                    password: user.password,
                    isAdmin: user.isAdmin,
                    phone: user.phone,
                    bio: user.bio,
                    pic: user.pic,
                    suggestions: user.suggestions,
                    interest: user.interest,
                    prompts: user.prompts,
                    interest_list: user.interest_list,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt,
                    token: generateToken(user._id),
                };
              return  res.status(200).json({ "message": "otp successfully verified", user: userBody });
            }
        } catch (err) {
            res.status(401).json({ "error": err.message })
        }

    }
})

module.exports = { adminOtpSend, otpVerificationTo }