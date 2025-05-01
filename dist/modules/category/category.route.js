"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRoute = void 0;
const express_1 = require("express");
const category_controller_1 = require("./category.controller");
const route = (0, express_1.Router)();
route.get("/", category_controller_1.categoryControllers.getAllCategory);
route.post("/", category_controller_1.categoryControllers.createCategory);
exports.categoryRoute = route;
