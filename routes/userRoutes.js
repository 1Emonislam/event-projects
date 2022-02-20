const express = require('express');
const { registerUser, loginUser, updateUser, getAllUsers, makeAdmin, getAllAdmins, getSingleUser, getAdmin, currentProfile, removeAdmin, userListSearch } = require('../constrollers/userControllers');
const { protect } = require('../middleware/authMiddleware');
const {verificationCheck} = require('../verification/verification')
const router = express.Router();
//mobile verify 2step verification

router.route('/').post(registerUser).get(protect,getAllUsers).put(protect,updateUser);
router.route('/profile').get(protect,currentProfile)
router.route('/userList').get(userListSearch)
router.route('/administrators').get(protect,getAllAdmins)
router.route('/:id').get(getSingleUser)
router.route('/otp-verification').put(protect,verificationCheck);
router.route('/makeAdmin/:email').put(protect,makeAdmin)
router.route('/removeAdmin/:email').put(protect,removeAdmin)
router.route('/login').post(loginUser)
module.exports = router;