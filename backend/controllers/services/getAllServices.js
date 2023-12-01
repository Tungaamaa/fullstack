const Service = require("../../models/service");

const getAllServices = async (req, res) => {
    try{
        const services = await Service.find({});
        if (!services) {
            res.status(404).json({ message: "Services not found" });
            return;
          }
          res.status(200).json(services);
    } catch (err) {
        res.status(500).json({ message: err.message});
    }
};

module.exports = {
    getAllServices,
}