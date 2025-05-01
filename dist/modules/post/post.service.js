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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postServices = void 0;
const prisma_1 = require("../../../generated/prisma");
const config_1 = __importDefault(require("../../config"));
const jwtHelper_1 = require("../../utils/jwtHelper");
const prismaProvider_1 = __importDefault(require("../../utils/prismaProvider"));
const createPost = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // const payload = req.body as Post;
    // const file = req.file as IFile;
    // if (file) {
    //   const imageUrl = await imageUploader(file);
    //   payload.image = imageUrl.secure_url;
    // }
    const result = yield prismaProvider_1.default.post.create({
        data: payload,
    });
    return result;
});
const createMany = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prismaProvider_1.default.post.createMany({
        data: payload,
    });
    return result;
});
const getAllPost = (query_1, paginateQuery_1, priceQuery_1, ...args_1) => __awaiter(void 0, [query_1, paginateQuery_1, priceQuery_1, ...args_1], void 0, function* (query, paginateQuery, priceQuery, token = "") {
    const queryCondition = [];
    if (token) {
        const decodedToken = jwtHelper_1.jwtHelper.decodedToken(token, config_1.default.jwt_access_secret);
        if ((decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken.role) === prisma_1.UserRole.PREMIUM) {
            queryCondition.push({});
        }
        else {
            queryCondition.push({
                isPremium: false,
            });
        }
    }
    else {
        queryCondition.push({
            isPremium: false,
        });
    }
    const { searchTerm } = query, fieldsValues = __rest(query, ["searchTerm"]);
    const { page = 1, limit = 5 } = paginateQuery;
    const { minPrice = 0, maxPrice = 1000000 } = priceQuery;
    if (searchTerm) {
        queryCondition.push({
            OR: [
                { title: { contains: searchTerm, mode: "insensitive" } },
                {
                    description: { contains: searchTerm, mode: "insensitive" },
                },
                {
                    category: {
                        name: { contains: searchTerm, mode: "insensitive" },
                    },
                },
            ],
        });
    }
    if (Object.keys(fieldsValues).length > 0) {
        queryCondition.push({
            AND: Object.keys(fieldsValues).map((key) => {
                if (key === "category") {
                    return {
                        [key]: {
                            name: {
                                equals: fieldsValues[key],
                            },
                        },
                    };
                }
                return {
                    [key]: {
                        equals: fieldsValues[key],
                    },
                };
            }),
        });
    }
    queryCondition.push({
        price: {
            gte: Number(minPrice),
            lte: Number(maxPrice),
        },
    });
    const skip = (Number(page) - 1) * Number(limit);
    const whereCondition = { AND: queryCondition };
    console.dir(queryCondition, { depth: null });
    const result = yield prismaProvider_1.default.post.findMany({
        where: whereCondition,
        take: Number(limit),
        skip,
    });
    return {
        data: result,
        meta: {
            total: yield prismaProvider_1.default.post.count({ where: whereCondition }),
            page: Number(page),
            limit: Number(limit),
        },
    };
});
const getAllPostByAdmin = (paginateQuery) => __awaiter(void 0, void 0, void 0, function* () {
    const { page = 1, limit = 10 } = paginateQuery;
    const skip = (Number(page) - 1) * Number(limit);
    const result = yield prismaProvider_1.default.post.findMany({
        take: Number(limit),
        skip,
    });
    return {
        data: result,
        meta: {
            total: yield prismaProvider_1.default.post.count({}),
            page: Number(page),
            limit: Number(limit),
        },
    };
});
const getSinglePost = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prismaProvider_1.default.post.findUnique({
        where: {
            id,
        },
    });
    return result;
});
const updatePost = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prismaProvider_1.default.post.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
});
exports.postServices = {
    createPost,
    createMany,
    getAllPost,
    getSinglePost,
    updatePost,
    getAllPostByAdmin,
};
