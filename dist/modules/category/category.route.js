"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRoute = void 0;
const express_1 = require("express");
const category_controller_1 = require("./category.controller");
const validateRequest_1 = __importDefault(require("../../utils/validateRequest"));
const category_validation_1 = require("./category.validation");
const route = (0, express_1.Router)();
route.get("/", category_controller_1.categoryControllers.getAllCategory);
route.post("/", (0, validateRequest_1.default)(category_validation_1.categoryValidation.createCategorySchema), category_controller_1.categoryControllers.createCategory);
exports.categoryRoute = route;
