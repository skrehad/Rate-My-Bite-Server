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
exports.commentService = void 0;
const prismaProvider_1 = __importDefault(require("../../utils/prismaProvider"));
const createComment = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prismaProvider_1.default.comment.create({
        data: payload,
    });
    return result;
});
const getCommentId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prismaProvider_1.default.comment.findUniqueOrThrow({
        where: { id },
    });
    return result;
});
const getAllComment = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prismaProvider_1.default.comment.findMany({});
    return result;
});
const getAllUsersComment = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prismaProvider_1.default.comment.findMany({
        where: {
            userId: payload === null || payload === void 0 ? void 0 : payload.id,
        },
    });
    return result;
});
exports.commentService = {
    createComment,
    getCommentId,
    getAllComment,
    getAllUsersComment,
};
