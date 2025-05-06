"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscribeRoute = void 0;
const express_1 = __importDefault(require("express"));
const subscribe_controller_1 = require("./subscribe.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const prisma_1 = require("../../../generated/prisma");
const router = express_1.default.Router();
// Check user subscription status
router.get('/', (0, auth_1.default)(prisma_1.UserRole.USER, prisma_1.UserRole.PREMIUM), subscribe_controller_1.SubscriptionController.checkUserSubscription);
// Get available subscription plans
router.get('/plans', subscribe_controller_1.SubscriptionController.getSubscriptionPlans);
// Initiate subscription payment
router.post('/payment/initiate', (0, auth_1.default)(prisma_1.UserRole.USER, prisma_1.UserRole.PREMIUM), subscribe_controller_1.SubscriptionController.initiatePayment);
// Verify subscription payment
router.get('/payment/verify', (0, auth_1.default)(prisma_1.UserRole.USER, prisma_1.UserRole.PREMIUM), subscribe_controller_1.SubscriptionController.verifyPayment);
// Cancel subscription
router.patch('/cancel', (0, auth_1.default)(prisma_1.UserRole.USER, prisma_1.UserRole.PREMIUM), subscribe_controller_1.SubscriptionController.cancelUserSubscription);
exports.subscribeRoute = router;
