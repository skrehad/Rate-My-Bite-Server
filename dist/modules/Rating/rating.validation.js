"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ratingValidation = void 0;
const zod_1 = require("zod");
const Createrating = zod_1.z.object({
    value: zod_1.z.number().min(1, "Rating must be at least 1").max(5, "Rating cannot be more than 5"),
    postId: zod_1.z.string().uuid("postId must be a valid UUID"),
    userId: zod_1.z.string().uuid("userId must be a valid UUID"),
});
exports.ratingValidation = {
    Createrating
};
