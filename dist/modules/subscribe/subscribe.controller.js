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
exports.SubscriptionController = void 0;
const http_status_1 = __importDefault(require("http-status"));
// import catchAsync from "../../../src/utils/catchAsync";
// import sendResponse from "../../../src/utils/sendResponse";
const subscribe_service_1 = require("./subscribe.service");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
// Cancel subscription
const cancelUserSubscription = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    if (!userId) {
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.UNAUTHORIZED,
            success: false,
            message: "User not authenticated",
            data: null,
        });
        return;
    }
    const result = yield subscribe_service_1.SubscriptionService.cancelSubscription(userId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: result.success,
        message: "Subscription cancelled successfully",
        data: null,
    });
}));
// Get available subscription plans
const getSubscriptionPlans = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const plans = subscribe_service_1.SubscriptionService.getSubscriptionPlans();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Subscription plans retrieved successfully",
        data: plans,
    });
}));
// Initiate subscription payment
const initiatePayment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    const { plan } = req.body;
    if (!userId) {
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.UNAUTHORIZED,
            success: false,
            message: "User not authenticated",
            data: null,
        });
        return;
    }
    // Get plan details to determine amount
    const plans = subscribe_service_1.SubscriptionService.getSubscriptionPlans();
    const planDetails = plans[plan];
    if (!planDetails) {
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.BAD_REQUEST,
            success: false,
            message: "Invalid subscription plan",
            data: null,
        });
        return;
    }
    console.log("req.user", req.user);
    console.log("req.body", req.body);
    console.log({ planDetails });
    const result = yield subscribe_service_1.SubscriptionService.initiateSubscriptionPayment({
        userId,
        plan,
        customerName: ((_b = req.body) === null || _b === void 0 ? void 0 : _b.customerName) || "Customer",
        customerPhone: (_c = req.body) === null || _c === void 0 ? void 0 : _c.customerPhone,
        customerEmail: ((_d = req.user) === null || _d === void 0 ? void 0 : _d.email) || "",
        customerAddress: (_e = req.body) === null || _e === void 0 ? void 0 : _e.customerAddress,
        customerCity: (_f = req.body) === null || _f === void 0 ? void 0 : _f.customerCity,
        amount: planDetails.price,
    });
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Payment initiated successfully",
        data: {
            checkout_url: result.checkout_url,
            transactionId: result.transactionId,
        },
    });
}));
// Verify payment and create subscription
const verifyPayment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { order_id } = req.query;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    console.log("userId from verify payment controller", userId);
    if (!userId) {
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.UNAUTHORIZED,
            success: false,
            message: "User not authenticated",
            data: null,
        });
        return;
    }
    if (!order_id || typeof order_id !== "string") {
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.BAD_REQUEST,
            success: false,
            message: "Order ID is required",
            data: null,
        });
        return;
    }
    const result = yield subscribe_service_1.SubscriptionService.verifySubscriptionPayment(order_id, userId);
    // Check if a user has previously cancelled - special handling
    if (result && result.status === "CANCELLED") {
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.BAD_REQUEST,
            success: false,
            message: result.message || "User previously cancelled - new payment required",
            data: {
                status: "CANCELLED",
                requiresNewPayment: true,
            },
        });
        return;
    }
    if (result && result.length > 0) {
        const isSuccess = result[0].bank_status === "Success";
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: isSuccess,
            message: isSuccess
                ? "Payment successful"
                : `Payment ${result[0].bank_status.toLowerCase()}`,
            data: {
                status: result[0].bank_status,
                transaction_id: order_id,
            },
        });
    }
    else {
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: false,
            message: "Payment verification failed",
            data: null,
        });
    }
}));
// Check if user is subscribed
const checkUserSubscription = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    if (!userId) {
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.UNAUTHORIZED,
            success: false,
            message: "User not authenticated",
            data: {
                isSubscribed: false,
                hasCancelled: false,
            },
        });
        return;
    }
    try {
        // Get subscription status from service
        const subscriptionStatus = yield subscribe_service_1.SubscriptionService.checkUserSubscription(userId);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: subscriptionStatus.isSubscribed
                ? "User has an active subscription"
                : subscriptionStatus.hasCancelled
                    ? "User has cancelled subscription"
                    : "User has no active subscription",
            data: subscriptionStatus,
        });
    }
    catch (error) {
        (0, sendResponse_1.default)(res, {
            statusCode: error.statusCode || http_status_1.default.INTERNAL_SERVER_ERROR,
            success: false,
            message: error.message || "Failed to check subscription status",
            data: {
                isSubscribed: false,
                hasCancelled: false,
            },
        });
    }
}));
exports.SubscriptionController = {
    cancelUserSubscription,
    getSubscriptionPlans,
    initiatePayment,
    verifyPayment,
    checkUserSubscription,
};
