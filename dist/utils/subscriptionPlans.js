"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateEndDate = exports.subscriptionPlans = void 0;
exports.subscriptionPlans = {
    MONTHLY: {
        name: "Monthly Premium",
        duration: 30,
        price: 299,
        description: "Access to all premium content for 30 days"
    },
    YEARLY: {
        name: "Yearly Premium",
        duration: 365,
        price: 2499,
        description: "Access to all premium content for 1 year (save 30%)"
    }
};
// Calculate end date based on subscription plan
const calculateEndDate = (plan) => {
    const now = new Date();
    const durationDays = exports.subscriptionPlans[plan].duration;
    return new Date(now.getTime() + durationDays * 24 * 60 * 60 * 1000);
};
exports.calculateEndDate = calculateEndDate;
