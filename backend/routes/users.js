const express = require("express");
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

const userData = [
  {
    id: 1,
    name: "John",
  },
  {
    id: 2,
    name: "Jane",
  },
  {
    id: 3,
    name: "Doe",
  },
];

router.get("/", (req, res) => {
  res.status(200).json(userData);
});

router.get("/:id", (req, res) => {
  const id = req.params.id;

  const user = userData.find((user) => user.id === parseInt(id));

  if (!user) {
    res.status(404).json({
      message: "User not found",
    });
  }
  res.status(200).json(user);
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const name = req.body.name;

  const user = userData.find((user) => user.id === parseInt(id));

  if (!user) {
    res.status(404).json({
      message: "User not found",
    });
  }
  user.name = name;
  res.json(user);
});

router.post("/", (req, res) => {
  const name = req.body.name;

  const newUser = {
    // id: userData.length + 1,
    id: uuidv4(),
    name: name,
  };
  userData.push(newUser);
  res.status(200).json(userData);
});

router.delete("/:id", (req, res) => {
    const id = req.params.id;
    const user = userData.find((user) => user.id === parseInt(id));
    if (!user) {
        res.status(404).json({
          message: "User not found",
        });
      }
    // const index = userData.indexOf(user);
    // userData.splice(index, 1);

    // res.status(200).json(userData);

    const updatedUserData = userData.filter((deletedUser) => deletedUser.id !== user.id);

    res.status(200).json(updatedUserData);
});

module.exports = router;
