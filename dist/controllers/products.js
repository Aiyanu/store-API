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
    const products = yield Products_1.default.find({ name: "vase table", });
    res.status(200).json({ products, nbHits: products.length });
    // res.status(200).json({"Success":true});
});
exports.getAllProductsStatic = getAllProductsStatic;
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, featured, company } = req.query;
    console.log(typeof name);
    console.log(typeof company);
    const queryObject = {};
    if (featured) {
        queryObject.featured = featured === "true" ? true : false;
    }
    if (company) {
        queryObject.company = company;
    }
    if (name) {
        queryObject.name = name;
    }
    const products = yield Products_1.default.find(queryObject);
    res.status(200).json({ products, nbHits: products.length });
});
exports.getAllProducts = getAllProducts;
