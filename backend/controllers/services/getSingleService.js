const Service = require("../../models/service");
const mongoose = require("mongoose");

const getSingleService = async (req, res ) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid product id" });
       }

       const service = await Service.findById(id);

       if (!service) {
        res.status(404).json({ message: "Service not found" });
        return;
       }
       res.status(200).json(service);
}

module.exports = {
    getSingleService,
}