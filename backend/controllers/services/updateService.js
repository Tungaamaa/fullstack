const Service = require("../../models/service");
const mongoose = require("mongoose");

const updateService = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid product id" });
       }

       const updateService = await Service.findOneAndUpdate(
        { _id: id },
        {...req.body}
       );

    if (!updateService) {
        res.status(404).json({ message: "Service not found" });
        return;
    }
    res.status(200).json({ message: "Service updated successfully" });
};

module.exports = {
    updateService,
};