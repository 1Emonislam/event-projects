const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const generateToken = require('../utils/generateToken');
const { verifyOtp } = require('../utils/otp');

const verificationCheck = asyncHandler(async (req, res) => {
    const { otp } = req.body;
    try {
        const verified = await verifyOtp(req.user.phone, otp);
        if (!verified) {
            res.status(401).json({"message":"user veryfication failed"});
        }else {
            await User.updateOne({ _id: req.user._id }, { verify: 'verified' });
            const userBody = {
                ...req.user._doc,
                token: generateToken(req.user._id),
            };
            res.status(200).json({ "message": "user successfully verified", user: userBody});
        }
    } catch (err) {
        res.status(401).json({"error": err.message})
    }

})


module.exports = { verificationCheck };