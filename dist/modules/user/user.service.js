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
exports.userServices = exports.getuserCredentials = void 0;
const prisma_1 = require("../../../generated/prisma");
const prismaProvider_1 = __importDefault(require("../../utils/prismaProvider"));
const getAllUser = (paginateQuery) => __awaiter(void 0, void 0, void 0, function* () {
    const { page = 1, limit = 10 } = paginateQuery;
    const skip = (Number(page) - 1) * Number(limit);
    const result = yield prismaProvider_1.default.user.findMany({
        take: Number(limit),
        skip,
        include: {
            comments: true,
            votes: true,
            ratings: true,
            posts: true,
        },
    });
    return {
        data: result,
        meta: {
            total: yield prismaProvider_1.default.user.count({}),
            page: Number(page),
            limit: Number(limit),
            totalPage: Math.ceil((yield prismaProvider_1.default.user.count({})) / Number(limit)),
        },
    };
});
const getSingleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prismaProvider_1.default.user.findUnique({
        where: {
            id,
        },
        include: {
            comments: true,
            votes: true,
            ratings: true,
            posts: true,
        },
    });
    return result;
});
const updateUser = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prismaProvider_1.default.user.update({
        where: {
            id,
        },
        data: payload,
        include: {
            comments: true,
            votes: true,
            ratings: true,
            posts: true,
        },
    });
    return result;
});
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prismaProvider_1.default.user.update({
        where: {
            id,
        },
        data: {
            isDeleted: true,
            status: prisma_1.UserStatus.DELETED,
        },
    });
    return result;
});
const getuserCredentials = (decoded) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, email } = decoded;
    const posts = yield prismaProvider_1.default.post.findMany({
        where: {
            userId: id,
        },
        include: {
            category: true,
            ratings: true,
            votes: true,
            comments: true,
            user: true,
        },
    });
    const comments = yield prismaProvider_1.default.comment.findMany({
        where: {
            userId: id,
        },
        include: {
            post: true,
            user: true,
        },
    });
    const ratings = yield prismaProvider_1.default.rating.findMany({
        where: {
            userId: id,
        },
        include: {
            post: true,
            user: true,
        },
    });
    const votes = yield prismaProvider_1.default.vote.findMany({
        where: {
            userId: id,
        },
        include: {
            post: true,
            user: true,
        },
    });
    const user = yield prismaProvider_1.default.user.findUnique({
        where: {
            id,
        },
        include: {
            comments: true,
            votes: true,
            ratings: true,
            posts: true,
        },
    });
    return {
        posts,
        comments,
        ratings,
        votes,
        user,
    };
});
exports.getuserCredentials = getuserCredentials;
exports.userServices = {
    getAllUser,
    updateUser,
    getSingleUser,
    deleteUser,
    getuserCredentials: exports.getuserCredentials,
};
