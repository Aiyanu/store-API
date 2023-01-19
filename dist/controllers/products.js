"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllProducts = exports.getAllProductsStatic = void 0;
const Products_1 = __importDefault(require("../models/Products"));
const getAllProductsStatic = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const search = req.query.name;
    const products = yield Products_1.default.find({}).sort("name");
    res.status(200).json({ products, nbHits: products.length });
    // res.status(200).json({"Success":true});
});
exports.getAllProductsStatic = getAllProductsStatic;
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, featured, company, sort, fields } = req.query;
    console.log(typeof name);
    console.log(typeof company);
    const queryObject = {};
    if (featured) {
        queryObject.featured = featured === "true" ? true : false;
    }
    if (company) {
        queryObject.company = String(company);
    }
    if (name) {
        queryObject.name = { $regex: String(name), $options: "i" };
    }
    let result = Products_1.default.find(queryObject);
    if (sort) {
        const sortList = String(sort).split(",").join(" ");
        result = result.sort(sortList);
    }
    else {
        result = result.sort("createdAt");
    }
    if (fields) {
        const fieldsList = String(fields).split(",").join(" ");
        result = result.select(fieldsList);
    }
    const products = yield result;
    res.status(200).json({ products, nbHits: products.length });
});
exports.getAllProducts = getAllProducts;
