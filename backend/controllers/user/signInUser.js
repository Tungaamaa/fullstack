const mongoose = require("mongoose");
const User = require("../../models/user");

const signInUser = (req, res) => {
    res.send("sign in user");
};

module.exports = { signInUser };