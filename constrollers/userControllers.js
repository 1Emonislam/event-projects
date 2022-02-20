const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const generateToken = require('../utils/generateToken');
const { sendOtpVia } = require('../utils/otp');

const registerUser = asyncHandler(async (req, res) => {
    const { first_name, last_name, phone, email, gender,location,industry, password, suggestions, interest, prompts, pic, interest_list } = req.body;
    // console.log(req.body)
    const emailExist = await User.findOne({ email });
    const phoneExist = await User.findOne({ phone });
    // if (userExists?.verify === 'unverified') {
    //     // sendOtp(phone)
    //     sendOtpVia(phone)
    //     const userBody = {
    //         _id: userExists._id,
    //         first_name: userExists.first_name,
    //         last_name: userExists.last_name,
    //         verify: userExists.verify,
    //         email: userExists.email,
    //         gender: userExists.gender,
    //         password: userExists.password,
    //         isAdmin: userExists.isAdmin,
    //         phone: userExists.phone,
    //         bio: userExists.bio,
    //         pic: userExists.pic,
    //         suggestions: userExists.suggestions,
    //         interest: userExists.interest,
    //         prompts: userExists.prompts,
    //         interest_list: userExists.interest_list,
    //         createdAt: userExists.createdAt,
    //         updatedAt: userExists.updatedAt,
    //         token: generateToken(userExists._id),
    //     };
    //     const token = generateToken(userExists._id);
    //     return res.status(401).json({ error: { isVerified: false, token: token } })
    // }
    // if (userExists?.verify === 'verified') {
    //     const userBody = 
    //     {
    //         _id: userExists._id,
    //         first_name: userExists.first_name,
    //         last_name: userExists.last_name,
    //         verify: userExists.verify,
    //         email: userExists.email,
    //         gender: userExists.gender,
    //         password: userExists.password,
    //         isAdmin: userExists.isAdmin,
    //         phone: userExists.phone,
    //         bio: userExists.bio,
    //         pic: userExists.pic,
    //         suggestions: userExists.suggestions,
    //         interest: userExists.interest,
    //         prompts: userExists.prompts,
    //         interest_list: userExists.interest_list,
    //         createdAt: userExists.createdAt,
    //         updatedAt: userExists.updatedAt,
    //         token: generateToken(userExists._id),
    //     };
    //     return res.status(200).json({ "message": "user already verified", user: userBody });
    // }
    if (!emailExist && !phoneExist) {
        sendOtpVia(phone)
        const user = await User.create({
            first_name,
            last_name,
            phone,
            email,
            gender,
            verify: 'unverified',
            password,
            pic,
            industry,
            location,
            suggestions,
            interest,
            prompts,
            interest_list
        })
        if (user) {
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
                location: user.location,
                industry: user.industry,
                suggestions: user.suggestions,
                interest: user.interest,
                prompts: user.prompts,
                interest_list: user.interest_list,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
                token: generateToken(user._id),
            };
            return res.status(201).json({ user: userBody })
        }
    } else {
        const error = {}
        if (emailExist) {
            error.email = 'Email already exists'
        }
        if (phoneExist) {
            error.phone = 'Phone already exists'
        }
        return res.status(302).json({ error })
    }
})

const getSingleUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
        return res.status(404).json({ "error": "Error Occured 404!" })
    }
    if (user) {
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
            location: user.location,
            industry: user.industry,
            suggestions: user.suggestions,
            interest: user.interest,
            prompts: user.prompts,
            interest_list: user.interest_list,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            token: generateToken(user._id),
        };
        return res.status(200).json({ user: userBody })
    }
})

const loginUser = asyncHandler(async (req, res) => {
    // console.log(req.body)
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({ "error": "No user found with this email" });
    }
    if (!(user && (await user.matchPassword(password)))) {
        return res.status(400).json({ "error": "Invalid Password!" });
    }
    if (user?.verify === 'unverified') {
        sendOtpVia(user.phone)
        const token = generateToken(user._id);
        return res.status(401).json({ error: { isVerified: false, token: token } })
    }
    if (user && (await user.matchPassword(password))) {
        return res.status(200).json({
            user:
            {
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
                location: user.location,
                industry: user.industry,
                suggestions: user.suggestions,
                interest: user.interest,
                prompts: user.prompts,
                interest_list: user.interest_list,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
                token: generateToken(user._id),
            }
        })
    } else {
        return res.status(400).json({ "error": "please try again!" });
    }
})

const currentProfile = asyncHandler(async (req, res) => {
    const userProfile = await User.findById(req.user._id);
    return res.json(userProfile)
})

const updateUser = asyncHandler(async (req, res) => {
    const { first_name,
        last_name,
        pic,
        suggestions,
        interest,
        prompts,
        bio,
        interest_list } = req.body;
    const user = await User.findById(req.user._id);
    // console.log(user)
    if (!user) {
        return res.status(401).json({ "error": "You can't perform this action user unauthorized!" })
    } else if (user && user) {
        user.first_name = first_name || user.first_name;
        user.last_name = last_name || user.last_name;
        user.pic = pic || user.pic;
        user.bio = bio || user.bio;
        user.suggestions = suggestions || user.suggestions;
        user.interest_list = interest_list || user.interest_list;
        user.interest = interest || user.interest;
        user.prompts = prompts || user.prompts;
        user.location= location || user.location;
        user.industry= industry || user.industry;
        const updatedUser = await user.save();
        if (!updatedUser) {
            return res.status(404).json({ "error": "user permission denied!" });
        } else {
            const userBody = {
                _id: updatedUser._id,
                first_name: updatedUser.first_name,
                last_name: updatedUser.last_name,
                verify: updatedUser.verify,
                email: updatedUser.email,
                gender: updatedUser.gender,
                password: updatedUser.password,
                isAdmin: updatedUser.isAdmin,
                phone: updatedUser.phone,
                bio: updatedUser.bio,
                pic: updatedUser.pic,
                location: updatedUser.location,
                industry: updatedUser.industry,
                suggestions: updatedUser.suggestions,
                interest: updatedUser.interest,
                prompts: updatedUser.prompts,
                interest_list: updatedUser.interest_list,
                createdAt: updatedUser.createdAt,
                updatedAt: updatedUser.updatedAt,
                token: generateToken(user._id),
            };
            return res.status(200).json({ "message": "user updated successfully!", user: userBody })
        }
    }
})

const getAllUsers = asyncHandler(async (req, res) => {
    const user = await User.find({});
    return res.status(202).json({ user: user })
})

const getAllAdmins = asyncHandler(async (req, res) => {
    const checkAdmin = await User.findById(req.user._id);
    if (!(checkAdmin.isAdmin === true)) {
        return res.status(401).json({ "error": "user unauthorized admin permission denied!" });
    } else {
        const admin = await User.find({ isAdmin: true });
        return res.status(202).json({ user: admin })
    }
})

const makeAdmin = asyncHandler(async (req, res) => {
    // console.log(req.user._id)
    let { email } = req.params;
    email = email.toLowerCase();
    const user = await User.findOne({ email: email });
    const permissionAdmin = await User.findById(req.user._id);
    if (!user) {
        return res.status(404).json({ "error": "user does not exist!" });
    }
    if (user.isAdmin === true) {
        return res.status(302).json({ "error": "user already administrator exist!" });
    }
    if (!(permissionAdmin.isAdmin === true)) {
        return res.status(401).json({ "error": "user permission denied" })
    } if (user.isAdmin === true) {
        res.status(302).json({ "error": "user already administrator exist!", user: user });
    } else if (permissionAdmin.isAdmin === true) {
        user.isAdmin = true;
        await user.save();
        res.status(202).json({ "message": "user successfully added administrator", user: user })
    }
})

const removeAdmin = asyncHandler(async (req, res) => {
    // console.log(req.user._id)
    let { email } = req.params;
    email = email.toLowerCase();
    const user = await User.findOne({ email: email });
    if (!user) {
        res.status(404).json({ "error": "user does not exist!" });
    }
    const permissionAdmin = await User.findById(req.user._id);
    if ((permissionAdmin.isAdmin === true)) {
        user.isAdmin = false;
        const save = await user.save();
        if (save) {
            return res.status(202).json({ "message": "admin successfully remove!", user: user })
        }
    } else {
        return res.status(401).json({ "error": "user permission denied admin permission required!" });
    }
})
const userListSearch = asyncHandler(async (req, res) => {
    let { page = 1, limit = 10, search } = req.query;
    // console.log(search)
    search = search?.trim();
    const KeyWordRegExp = new RegExp(search, "i");
    const userList = await User.find({ $or: [{ first_name: KeyWordRegExp },{last_name: KeyWordRegExp}, { email: KeyWordRegExp }, { phone: KeyWordRegExp },{location: KeyWordRegExp},{industry:KeyWordRegExp}, { gender: KeyWordRegExp }], }).sort({createdAt:1,_id:-1}).limit(limit * 1).skip((page - 1) * limit);
    const count = await User.find({ $or: [{ first_name: KeyWordRegExp },{last_name: KeyWordRegExp}, { email: KeyWordRegExp }, { phone: KeyWordRegExp },{location: KeyWordRegExp},{industry:KeyWordRegExp}, { gender: KeyWordRegExp }], }).sort({createdAt:1,_id:-1}).count();
    const totalUser = await User.find({}).count();
    res.json({totalUser, count, "user": userList })
})
const AdminListSearch = asyncHandler(async (req, res) => {
    let { page = 1, limit = 10, search } = req.query;
    // console.log(search)
    search = search?.trim();
    const KeyWordRegExp = new RegExp(search, "i");
    const userList = await User.find({ $or: [{ first_name: KeyWordRegExp },{last_name: KeyWordRegExp}, { email: KeyWordRegExp }, { phone: KeyWordRegExp },{location: KeyWordRegExp},{industry:KeyWordRegExp}, { gender: KeyWordRegExp }],isAdmin:true }).sort({createdAt:1,_id:-1}).limit(limit * 1).skip((page - 1) * limit);
    const count = await User.find({ $or: [{ first_name: KeyWordRegExp },{last_name: KeyWordRegExp}, { email: KeyWordRegExp }, { phone: KeyWordRegExp },{location: KeyWordRegExp},{industry:KeyWordRegExp}, { gender: KeyWordRegExp }],isAdmin:true }).sort({createdAt:1,_id:-1}).count();
    const totalUser = await User.find({}).count();
    res.json({totalUser, count, "user": userList })
})
module.exports = { registerUser, loginUser, updateUser, getAllUsers, makeAdmin, currentProfile, getAllAdmins, getSingleUser, removeAdmin, userListSearch,AdminListSearch };