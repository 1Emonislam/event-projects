const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema(
    {
        first_name: {
            type: String,
            required: [true,"First Name is required"]
        },
        last_name: {
            type: String,
            required: [true, "Last Name is required"],
            default: 'null'
        },
        verify:{
            type:String,
            required:true,
            default:'unverified'
        },
        email: {
            type: String,
            required: [true,"Email is required"],
            lowercase: true,
            unique: true,
        },
        password: {
            type: String,
            required: [true,"Password is required"],
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false,
        },
        phone: {
            type: String,
            required: [ true, "Phone Number is required"],
        },
        bio:{
            type: String,
            required:true,
            default:'null'
        },
        pic: {
            type: String,
            required: [ true, "Profile image is required"],
            default:
                "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
        },
        interest_list: [ ],
        gender:{
            type:String
        },
        location:{
            type:String
        },
        industry:{
            type:String
        },
        suggestions:[],
        interest:[],
        prompts:[],
    },
    {
        timestamps: true,
    }
)

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema)
module.exports = User;