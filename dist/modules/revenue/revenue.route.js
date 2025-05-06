"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.revenueRoute = void 0;
const express_1 = __importDefault(require("express"));
const revenue_controller_1 = require("./revenue.controller");
const router = express_1.default.Router();
router.get('/', 
// auth(UserRole.ADMIN),
revenue_controller_1.RevenueController.getRevenue);
exports.revenueRoute = router;
