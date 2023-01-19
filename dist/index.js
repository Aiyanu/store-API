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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const products_1 = __importDefault(require("./routes/products"));
const connect_1 = require("./db/connect");
const notFound_1 = require("./middlewares/notFound");
require("express-async-error");
const error_handler_1 = require("./middlewares/error-handler");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
const url = process.env.URL;
app.use(express_1.default.json());
app.use("/api/v1/products/", products_1.default);
app.use(notFound_1.notFound);
app.use(error_handler_1.errorHandlerMiddleware);
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, connect_1.connectDB)(url);
        app.listen(port, () => {
            console.log(`Server is running on port ${port} ⚡⚡`);
        });
    }
    catch (err) {
        console.log(err);
    }
});
start();
