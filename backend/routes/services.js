const express = require("express");
const { getAllServices } = require("../controllers/services/getAllServices");
const {createService } = require("../controllers/services/createService");
const { getSingleService } = require("../controllers/services/getSingleService");
const { updateService } = require("../controllers/services/updateService");
const { deleteService } = require("../controllers/services/deleteService");


const router = express.Router();

router.get("/", getAllServices);

router.post("/", createService);

router.get("/:id", getSingleService);

router.put("/:id", updateService);

router.delete("/:id", deleteService);

module.exports = router;