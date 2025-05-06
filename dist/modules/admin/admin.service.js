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
exports.adminServices = void 0;
const prisma_1 = require("../../../generated/prisma");
const prismaProvider_1 = __importDefault(require("../../utils/prismaProvider"));
const getAdminCredentials = () => __awaiter(void 0, void 0, void 0, function* () {
    const totasPosts = yield prismaProvider_1.default.post.count({});
    const totalUsers = yield prismaProvider_1.default.user.count({});
    const totalSubscribers = yield prismaProvider_1.default.user.count({
        where: {
            isPremium: true,
        },
    });
    const totalComments = yield prismaProvider_1.default.comment.count({});
    const totalCategories = yield prismaProvider_1.default.category.count({});
    const totalRatings = yield prismaProvider_1.default.rating.count({});
    const totalVotes = yield prismaProvider_1.default.vote.count({});
    const posts = yield prismaProvider_1.default.post.findMany({
        take: 3,
        orderBy: {
            createdAt: "desc",
        },
        include: {
            category: true,
            ratings: true,
            votes: true,
            comments: true,
            user: true,
        },
    });
    const users = yield prismaProvider_1.default.user.findMany({
        take: 3,
        orderBy: {
            createdAt: "desc",
        },
        include: {
            comments: true,
            votes: true,
            ratings: true,
            posts: true,
        },
    });
    const categories = yield prismaProvider_1.default.category.findMany({
        take: 3,
        orderBy: {
            createdAt: "desc",
        },
        include: {
            posts: true,
        },
    });
    return {
        totalPosts: totasPosts,
        totalUsers: totalUsers,
        totalSubscribers,
        totalComments,
        totalCategories,
        totalRatings,
        totalVotes,
        posts,
        users,
        categories,
    };
});
const makeAdmin = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prismaProvider_1.default.user.update({
        where: {
            email: data.email,
        },
        data: {
            role: prisma_1.UserRole.ADMIN,
        },
    });
    return result;
});
exports.adminServices = {
    getAdminCredentials,
    makeAdmin,
};
