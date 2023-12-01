const Service = require("../../models/service");

const createService = async (req, res) => {
    const { name, price, description, category } = req.body;
  
    try {
      if (!name || !price || !description || !category) {
        return res.status(400).json({
          message: "All fields are required",
        });
      } else {
        const service = await Service.create({
          name,
          price,
          description,
          category,
        });
  
        res.status(201).json( service );
      }
    } catch (err) {
      return res.status(500).json({
        message: err.message,
      });
    }
};

module.exports = {
    createService,
}