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
exports.RevenueService = void 0;
const prismaProvider_1 = __importDefault(require("../../utils/prismaProvider"));
// Get total revenue with filtering options
const getRevenue = (filters) => __awaiter(void 0, void 0, void 0, function* () {
    const { startDate, endDate, paymentMethod, plan } = filters;
    // Build filter conditions
    const whereClause = {
        status: 'SUCCESS'
    };
    if (startDate) {
        whereClause.createdAt = Object.assign(Object.assign({}, whereClause.createdAt), { gte: new Date(startDate) });
    }
    if (endDate) {
        whereClause.createdAt = Object.assign(Object.assign({}, whereClause.createdAt), { lte: new Date(endDate) });
    }
    if (paymentMethod) {
        whereClause.paymentMethod = paymentMethod;
    }
    if (plan) {
        whereClause.plan = plan;
    }
    // Get all transactions matching the filter
    const transactions = yield prismaProvider_1.default.transaction.findMany({
        where: whereClause,
        orderBy: {
            createdAt: 'asc'
        }
    });
    // Calculate total revenue
    const totalRevenue = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
    // Group by plan
    const planGroups = {};
    // Group by payment method
    const paymentMethodGroups = {};
    // Group by month
    const periodGroups = {};
    // Process transactions for grouping
    transactions.forEach((transaction) => {
        // Plan groups
        if (!planGroups[transaction.plan]) {
            planGroups[transaction.plan] = { amount: 0, count: 0 };
        }
        planGroups[transaction.plan].amount += transaction.amount;
        planGroups[transaction.plan].count += 1;
        // Payment method groups
        if (!paymentMethodGroups[transaction.paymentMethod]) {
            paymentMethodGroups[transaction.paymentMethod] = { amount: 0, count: 0 };
        }
        paymentMethodGroups[transaction.paymentMethod].amount += transaction.amount;
        paymentMethodGroups[transaction.paymentMethod].count += 1;
        // Period (month) groups
        const periodKey = transaction.createdAt.toISOString().substring(0, 7); // YYYY-MM format
        if (!periodGroups[periodKey]) {
            periodGroups[periodKey] = 0;
        }
        periodGroups[periodKey] += transaction.amount;
    });
    // Convert grouped data to arrays
    const revenueByPlan = Object.entries(planGroups).map(([plan, data]) => ({
        plan,
        amount: data.amount,
        count: data.count
    }));
    const revenueByPaymentMethod = Object.entries(paymentMethodGroups).map(([paymentMethod, data]) => ({
        paymentMethod,
        amount: data.amount,
        count: data.count
    }));
    const revenueByPeriod = Object.entries(periodGroups).map(([period, amount]) => ({
        period,
        amount
    })).sort((a, b) => a.period.localeCompare(b.period));
    return {
        totalRevenue,
        transactionCount: transactions.length,
        averageTransactionValue: transactions.length > 0 ? totalRevenue / transactions.length : 0,
        revenueByPlan,
        revenueByPaymentMethod,
        revenueByPeriod
    };
});
exports.RevenueService = {
    getRevenue
};
