"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const zod_1 = require("zod");
const globalErrorHandler = (err, _req, res, _next) => {
    let message = (err === null || err === void 0 ? void 0 : err.message) || "Something went wrong";
    const statusCode = (err === null || err === void 0 ? void 0 : err.statusCode) || http_status_1.default.INTERNAL_SERVER_ERROR;
    if (err instanceof zod_1.ZodError) {
        message = err.issues[0].message;
    }
    res.status(statusCode).json({
        success: false,
        message,
        err: err,
        stack: process.env.NODE_ENV === "development" ? err === null || err === void 0 ? void 0 : err.stack : undefined,
    });
};
exports.default = globalErrorHandler;
