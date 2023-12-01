const Service = require("../../models/service");
const mongoose = require("mongoose");


const deleteService = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid service id" });
       }

       const service = await Service.findOneAndDelete(id);

       if (!service) {
        res.status(404).json({ message: "Service not found" });
        return;
       }

       res.status(200).json({ message: "Service deleted successfully" });
};

module.exports = {
    deleteService,
}