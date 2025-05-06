"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const prisma_1 = require("../../../generated/prisma");
const route = (0, express_1.Router)();
route.get("/dashboard", (0, auth_1.default)(prisma_1.UserRole.USER, prisma_1.UserRole.PREMIUM), user_controller_1.userControllers.getUserCredential);
route.get("/", (0, auth_1.default)(prisma_1.UserRole.ADMIN), user_controller_1.userControllers.getAllUser);
route.patch("/:userId", (0, auth_1.default)(prisma_1.UserRole.ADMIN), user_controller_1.userControllers.updateUser);
route.get("/:userId", (0, auth_1.default)(prisma_1.UserRole.ADMIN), user_controller_1.userControllers.getSingleUser);
route.delete("/:userId", (0, auth_1.default)(prisma_1.UserRole.ADMIN), user_controller_1.userControllers.deleteUser);
exports.userRoute = route;
