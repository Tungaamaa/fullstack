const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).json([
        {
            id: 1,
            name : "Product 1",
        },
        {
            id: 2,
            name : "Product 2",
        },
    ]);
});

module.exports = router;