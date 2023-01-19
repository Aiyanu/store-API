"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const productsSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "product name must be provided"]
    },
    price: {
        type: Number,
        required: [true, "product price must be provided"]
    },
    company: {
        type: String,
        enum: {
            values: ["ikea", "liddy", "caressa", "marcos"],
            message: "{VALUE} is not supported"
        },
        required: [true, "company name must be provided"]
    },
    featured: {
        type: Boolean,
        default: false
    },
    rating: {
        type: Number,
        default: 4.5
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});
exports.default = (0, mongoose_1.model)("Products", productsSchema);
