const express = require("express");
const { v4: uuidv4 } = require('uuid');
const { signInUser, signUpUser } = require("../controllers/user");

const router = express.Router();

router.post("/sign-in", signInUser);
router.post("/sign-up", signUpUser);


module.exports = router;
