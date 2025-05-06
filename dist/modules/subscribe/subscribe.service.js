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
exports.SubscriptionService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const subscribe_utils_1 = require("./subscribe.utils");
const subscriptionPlans_1 = require("../../utils/subscriptionPlans");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const prismaProvider_1 = __importDefault(require("../../utils/prismaProvider"));
// Track cancelled users by ID
const cancelledUsers = new Set();
// Cancel premium subscription
const cancelSubscription = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Add user to cancelled set
        cancelledUsers.add(userId);
        console.log(`Added user ${userId} to cancelled users`);
        // Update user status to non-premium
        yield prismaProvider_1.default.user.update({
            where: { id: userId },
            data: {
                isPremium: false,
                role: "USER",
                premiumUntil: null
            }
        });
        return { success: true };
    }
    catch (error) {
        console.error("Error cancelling subscription:", error);
        return { success: false };
    }
});
// Get subscription plans
const getSubscriptionPlans = () => {
    return subscriptionPlans_1.subscriptionPlans;
};
// Check if user is subscribed
const checkUserSubscription = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!userId) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "User ID is required");
    }
    // Check user's premium status directly
    const user = yield prismaProvider_1.default.user.findUnique({
        where: { id: userId },
        select: { isPremium: true, premiumUntil: true, role: true }
    });
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    // Check if user has cancelled before
    const hasCancelled = cancelledUsers.has(userId);
    return {
        isSubscribed: user.isPremium || false,
        premiumUntil: user.premiumUntil,
        role: user.role,
        hasCancelled
    };
});
// Initiate subscription payment
const initiateSubscriptionPayment = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, plan, customerName, customerEmail, amount, customerPhone, customerAddress, customerCity } = payload;
    // Create a transaction ID to track this payment
    const transactionId = `SUB_${Date.now()}_${userId.substring(0, 8)}`;
    // If a user is initiating a new payment, remove them from cancelled users list
    // This allows them to make a new payment and verify it
    if (cancelledUsers.has(userId)) {
        console.log(`User ${userId} is making a new payment after cancellation - clearing cancelled status`);
        cancelledUsers.delete(userId);
    }
    console.log({ payload });
    // Prepare payment payload for Shurjopay
    const shurjopayPayload = {
        amount: amount,
        order_id: transactionId,
        currency: "BDT",
        customer_name: customerName,
        customer_email: customerEmail,
        client_ip: "127.0.0.1",
        customer_phone: customerPhone,
        customer_city: customerCity,
        customer_address: customerAddress
    };
    // Make payment request to Shurjopay
    const paymentResponse = yield subscribe_utils_1.subscribeUtils.makePaymentAsync(shurjopayPayload);
    if (!paymentResponse || !paymentResponse.checkout_url) {
        throw new AppError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, "Failed to initiate payment");
    }
    console.log("paymentResponse", paymentResponse);
    return {
        checkout_url: paymentResponse.checkout_url,
        transactionId: paymentResponse.sp_order_id
    };
});
// Verify subscription payment and update user to premium if successful
const verifySubscriptionPayment = (orderId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    // Verify payment with Shurjopay
    const verificationResponse = yield subscribe_utils_1.subscribeUtils.verifyPaymentAsync(orderId);
    if ((verificationResponse === null || verificationResponse === void 0 ? void 0 : verificationResponse.length) && verificationResponse[0].bank_status === 'Success') {
        const paymentInfo = verificationResponse[0];
        // Get transaction ID
        const transactionId = paymentInfo.order_id || orderId;
        console.log("transactionId", transactionId);
        // Check if user has cancelled their subscription before
        if (cancelledUsers.has(userId)) {
            console.log(`User ${userId} previously cancelled - must make a new payment`);
            return Object.assign(Object.assign({}, verificationResponse), { status: 'CANCELLED', message: 'User has previously cancelled subscription - new payment required' });
        }
        let plan;
        console.log("paymentInfo.amount", { paymentInfo });
        if (paymentInfo.amount >= 2000) {
            plan = "YEARLY";
        }
        else {
            plan = "MONTHLY";
        }
        const endDate = (0, subscriptionPlans_1.calculateEndDate)(plan);
        console.log("endDate", endDate);
        // Update user to premium status
        yield prismaProvider_1.default.user.update({
            where: { id: userId },
            data: {
                isPremium: true,
                role: "PREMIUM",
                premiumUntil: endDate
            }
        });
        // Record transaction in database
        yield prismaProvider_1.default.transaction.create({
            data: {
                userId,
                amount: paymentInfo.amount,
                transactionId,
                paymentMethod: 'ShurjoPay',
                plan,
                status: 'SUCCESS'
            }
        });
        // If they had cancelled before, they've now successfully renewed
        if (cancelledUsers.has(userId)) {
            cancelledUsers.delete(userId);
        }
    }
    return verificationResponse;
});
exports.SubscriptionService = {
    cancelSubscription,
    getSubscriptionPlans,
    initiateSubscriptionPayment,
    verifySubscriptionPayment,
    checkUserSubscription
};
