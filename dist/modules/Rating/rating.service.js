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
exports.RatingService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const prismaProvider_1 = __importDefault(require("../../utils/prismaProvider"));
const createRatingIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isRatingExist = yield prismaProvider_1.default.rating.findFirst({
        where: {
            userId: payload.userId,
            postId: payload.postId,
        },
    });
    if (isRatingExist) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "You already rated this post");
    }
    const result = yield prismaProvider_1.default.rating.create({
        data: payload,
    });
    return result;
});
const getAllRating = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prismaProvider_1.default.rating.findMany({});
    return result;
});
const getSingleRating = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const getSingleRatingresult = yield prismaProvider_1.default.rating.findUniqueOrThrow({
        where: { id },
    });
    return getSingleRatingresult;
});
exports.RatingService = {
    createRatingIntoDB,
    getAllRating,
    getSingleRating,
};
