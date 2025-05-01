"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const notFound = (req, res) => {
    console.log({ url: req.originalUrl });
    res.status(http_status_1.default.NOT_FOUND).json({
        success: false,
        message: "Api not found",
        data: null,
    });
};
exports.default = notFound;
