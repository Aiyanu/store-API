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
    const products = yield Products_1.default
        .find({ price: { $gt: 30 } })
        .sort("name")
        .select("name price")
        .limit(10)
        .skip(5);
    res.status(200).json({ products, nbHits: products.length });
    // res.status(200).json({"Success":true});
});
exports.getAllProductsStatic = getAllProductsStatic;
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, featured, company, sort, fields, numericFilters } = req.query;
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
    if (numericFilters) {
        const operatorMap = {
            ">": "$gt",
            ">=": "$gte",
            "=": "$eq",
            "<": "$lt",
            "<=": "$lte",
        };
        console.log(operatorMap[">"]);
        const regEx = /\b(<|>|>=|<=|=)\b/g;
        let filters = String(numericFilters).replace(regEx, 
        // @ts-ignore 
        (match) => `-${operatorMap[(match)]}-`);
        console.log(filters);
        const options = ["price", "rating"];
        // @ts-ignore
        filters = filters.split(",").forEach((item) => {
            const [field, operator, value] = item.split("-");
            if (options.includes(field)) {
                // @ts-ignore
                queryObject[field] = { [operator]: Number(value) };
            }
        });
        console.log(queryObject);
    }
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    result = result.skip(skip).limit(limit);
    // 23
    // 4 (7 7 7 2)
    const products = yield result;
    res.status(200).json({ products, nbHits: products.length });
});
exports.getAllProducts = getAllProducts;
