const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "firstname is required"],
        trim: true,
        lowercase: true
    },
    lastName: {
        type: String,
        required: [true, "lastname is required"],
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, "password is required"],
        minlength: 6,
        trim: true,
    },
});

module.exports = mongoose.model("User", userSchema);