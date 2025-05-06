"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postValidation = void 0;
const zod_1 = require("zod");
const postSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(1, "Title is required"),
        description: zod_1.z.string().min(1, "Description is required"),
        location: zod_1.z.string().min(1, "Location is required"),
        image: zod_1.z.string().url("Image must be a valid URL"),
        priceRange: zod_1.z.enum(["Low", "Medium", "High"]),
        categoryId: zod_1.z.string({ required_error: "Category ID is required" }), // Category ID is required
        userId: zod_1.z.string({ required_error: "User ID is required" }), // User ID is required
    }),
});
const manyPostSchema = zod_1.z.object({
    body: zod_1.z.array(zod_1.z.object({
        title: zod_1.z.string().min(1, "Title is required"),
        description: zod_1.z.string().min(1, "Description is required"),
        location: zod_1.z.string().min(1, "Location is required"),
        image: zod_1.z.string().url("Image must be a valid URL"),
        priceRange: zod_1.z.enum(["Low", "Medium", "High"]),
        categoryId: zod_1.z.string({ required_error: "Category ID is required" }), // Category ID is required
        userId: zod_1.z.string({ required_error: "User ID is required" }), // User ID is required
    })),
});
exports.postValidation = {
    postSchema,
    manyPostSchema,
};
