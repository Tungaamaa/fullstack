const mongoose = require("mongoose");
const User = require("../../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "1d"});
}


const signInUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).send("please provide a valid email and password");
    return;
  }

  const user = await User.findOne({ email });

  if (!user) {
    res
      .status(400)
      .send("User does not exist! Check your email address and password");
    return;
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    res.status(400).send("Invalid credentials");
    return;
  }

  const token = createToken(user._id);

  res.status(200).json({ message: "Sign in successfully", user });
};

module.exports = { signInUser };

//"email":"test1@gmail.com",
//"password":"123@*Tljkjk"
