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
exports.voteServices = void 0;
const prismaProvider_1 = __importDefault(require("../../utils/prismaProvider"));
const createVote = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prismaProvider_1.default.vote.create({
        data: {
            status: payload.status,
            user: { connect: { id: payload.userId } },
            post: { connect: { id: payload.postId } }
        },
    });
    return result;
});
// ---------all vote-------
const getAllVote = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prismaProvider_1.default.vote.findMany({});
    return result;
});
// ----------get single vote----------
const getSingleVote = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prismaProvider_1.default.vote.findUniqueOrThrow({
        where: { id }
    });
    return result;
});
exports.voteServices = {
    createVote,
    getAllVote,
    getSingleVote
};
