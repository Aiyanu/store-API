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
exports.editTask = exports.updateTask = exports.deleteTask = exports.getSingleTask = exports.addTask = exports.getAllTasks = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Task_1 = __importDefault(require("../models/Task"));
const getAllTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield Task_1.default.find({});
        res.status(200).json({ tasks });
    }
    catch (err) {
        res.status(400).json({ err });
    }
});
exports.getAllTasks = getAllTasks;
const addTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield Task_1.default.create(req.body);
        res.status(201).json({ tasks });
    }
    catch (err) {
        res.status(401).json({ err });
    }
});
exports.addTask = addTask;
const getSingleTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: TaskID } = req.params;
    if (!mongoose_1.default.isValidObjectId(TaskID)) {
        res.status(400).json({ err: "Invalid ID" });
    }
    try {
        const task = yield Task_1.default.findById({ _id: TaskID });
        res.status(200).json({ task });
    }
    catch (err) {
        res.status(400).json({ err });
    }
});
exports.getSingleTask = getSingleTask;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: TaskID } = req.params;
    if (!mongoose_1.default.isValidObjectId(TaskID)) {
        res.status(400).json({ err: "Invalid ID" });
    }
    try {
        const task = yield Task_1.default.findByIdAndDelete({ _id: TaskID });
        res.status(200).json({ task: null, status: "success" });
    }
    catch (err) {
        res.status(400).json({ err });
    }
});
exports.deleteTask = deleteTask;
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: TaskID } = req.params;
    if (!mongoose_1.default.isValidObjectId(TaskID)) {
        res.status(400).json({ err: "Invalid ID" });
    }
    try {
        const task = yield Task_1.default.findByIdAndUpdate({ _id: TaskID }, Object.assign({}, req.body), {
            new: true,
            runValidators: true
        });
        res.status(200).json({ task });
    }
    catch (err) {
        res.status(400).json({ err });
    }
});
exports.updateTask = updateTask;
const editTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: TaskID } = req.params;
    if (!mongoose_1.default.isValidObjectId(TaskID)) {
        res.status(400).json({ err: "Invalid ID" });
    }
    try {
        const task = yield Task_1.default.findByIdAndUpdate({ _id: TaskID }, Object.assign({}, req.body), {
            new: true,
            runValidators: true,
            overwrite: true,
        });
        res.status(200).json({ task });
    }
    catch (err) {
        res.status(400).json({ err });
    }
});
exports.editTask = editTask;
