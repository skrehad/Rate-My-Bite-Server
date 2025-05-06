"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRoute = void 0;
const express_1 = require("express");
const admin_controller_1 = require("./admin.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const prisma_1 = require("../../../generated/prisma");
const route = (0, express_1.Router)();
route.get("/dashboard", (0, auth_1.default)(prisma_1.UserRole.ADMIN), admin_controller_1.adminControllers.getAdminCredentials);
route.post("/make-admin", admin_controller_1.adminControllers.makeAdmin);
exports.adminRoute = route;
