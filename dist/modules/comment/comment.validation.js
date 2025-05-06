"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentValidation = void 0;
const zod_1 = require("zod");
const createCommentSchema = zod_1.z.object({
    body: zod_1.z.object({
        text: zod_1.z.string().min(1, "Comment is required"),
        postId: zod_1.z.string().uuid("postId must be a valid UUID"),
        userId: zod_1.z.string().uuid("userId must be a valid UUID"),
    }),
});
exports.commentValidation = {
    createCommentSchema,
};
