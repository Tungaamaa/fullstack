const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
    {
        name : {
            type: String,
            required: [true, "Service name is required"]
        },
        price : {
            type: Number,
            required: [true, "Service price is required"]
        },
        description : {
            type: String,
            required: [true, "Service description is required"]
        },
        category : {
            type: String,
            required: [true, "Service category is required"]
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Service", serviceSchema);