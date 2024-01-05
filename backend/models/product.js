const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        name : {
            type: String,
            required: [true, "Product name is required"]
        },
        price : {
            type: Number,
            required: [true, "Product price is required"]
        },
        description : {
            type: String,
            required: [true, "Product description is required"]
        },
        category : {
            type: String,
            required: [true, "Product category is required"]
        },
        userId: {
            type: String,
            required: [true, "Product userId is required"],
        },
        // userEmail: {
        //     type: String,
        //     required: [true, "Product email is required"],
        // },
         // userImage: {
        //     type: String,
        //     required: [true, "Product image is required"],
        // }
        type: {
            type: String,
            enum: ["Public", "Private"],
            required: [true, "Product visibility is required"],
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Product", productSchema);