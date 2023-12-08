const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
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