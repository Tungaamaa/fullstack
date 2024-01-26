const User = require("../../models/user");
const validator = require("validator");
const bcrypt = require("bcrypt");

const changeProfile = async (req, res) => {
  const { email, password, newEmail, newPassword } = req.body;

  if (!email || !password || !newEmail || !newPassword) {
    res.status(400).json({
      message: "Email, password, new email and new password are required",
    });
    return;
  }

  res.json(email, password, newEmail, newPassword);

  try {
    const user = await User.findOne({ email });

    if (!user) {
      res.status(400).json({ message: "User not found" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(400).json({ message: "invalid password" });
      return;
    }

    if (!validator.isEmail(newEmail)) {
      res.status(400).json({ message: "email is not a valid email" });
      return;
    }

    if (!validator.isStrongPassword(newPassword)) {
      res.status(400).json({ message: "password is not strong" });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.email = newEmail;
    user.password = hashedPassword;

    const updatedUser = await user.save();
    res.status(200).json({
      user: {
        id: updatedUser._id,
        email: updatedUser.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { changeProfile };
