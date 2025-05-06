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
exports.categoryServices = void 0;
const prismaProvider_1 = __importDefault(require("../../utils/prismaProvider"));
const createCategoty = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isCategoryExist = yield prismaProvider_1.default.category.findUnique({
        where: { name: payload === null || payload === void 0 ? void 0 : payload.name },
    });
    if (isCategoryExist) {
        throw new Error("Category already exist");
    }
    const result = yield prismaProvider_1.default.category.create({
        data: payload,
    });
    return result;
});
const getAllCategory = (paginateQuery) => __awaiter(void 0, void 0, void 0, function* () {
    const { page = 1, limit = 10 } = paginateQuery;
    const skip = (Number(page) - 1) * Number(limit);
    const result = yield prismaProvider_1.default.category.findMany({
        take: Number(limit),
        skip,
    });
    return {
        data: result,
        meta: {
            total: yield prismaProvider_1.default.category.count({}),
            page: Number(page),
            limit: Number(limit),
            totalPage: Math.ceil((yield prismaProvider_1.default.category.count({})) / Number(limit)),
        },
    };
});
exports.categoryServices = {
    createCategoty,
    getAllCategory,
};
