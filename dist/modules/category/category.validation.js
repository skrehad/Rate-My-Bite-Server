"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryValidation = void 0;
const zod_1 = require("zod");
const createCategorySchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, "Name is required"),
        image: zod_1.z.string().url("Image must be a valid URL"),
    }),
});
exports.categoryValidation = {
    createCategorySchema,
};
