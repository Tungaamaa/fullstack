const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../../models/user");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

const signUpUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    res.status(400).send("please provide a valid email and password");
    return;
  }

  if (!validator.isEmail(email)) {
    res.status(400).send("Please provide a valid email");
    return;
  }

  if (!validator.isStrongPassword(password)) {
    res.status(400).send("Please provide a strong password");
    return;
  }

  try {
    const user = await User.findOne({ email });
    if (user) {
      res.status(400).send("User already exists");
      return;
    }

    //salting and hashing password
    const salt = await bcrypt.genSalt(10);
    //hasging the password
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    const token = createToken(newUser._id);

    res.status(200).json({ newUser, token });
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

module.exports = { signUpUser };
