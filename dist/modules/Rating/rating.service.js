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
const prismaProvider_1 = __importDefault(require("../../utils/prismaProvider"));
/*
-----------------------**************-------------
                      ceate rating
-----------------------***************---------- */
const createRatingIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prismaProvider_1.default.rating.create({
        data: {
            userId: payload.userId,
            postId: payload.postId,
            value: payload.value,
        },
    });
    return result;
});
/*
-----------------------**************-------------
                      get rating
-----------------------***************----------
*/
const getAllRating = () => __awaiter(void 0, void 0, void 0, function* () {
    const AllRatingresult = yield prismaProvider_1.default.rating.findMany();
    return AllRatingresult;
});
/*
-----------------------**************-------------
                      get single rating
-----------------------***************----------
*/
const getSingleRating = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const getSingleRatingresult = yield prismaProvider_1.default.rating.findUniqueOrThrow({
        where: { id }
    });
    return getSingleRatingresult;
});
exports.RatingService = {
    createRatingIntoDB,
    getAllRating,
    getSingleRating
};
