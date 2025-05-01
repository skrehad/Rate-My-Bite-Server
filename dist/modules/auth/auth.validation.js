"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authValidation = void 0;
const zod_1 = __importDefault(require("zod"));
const loginValidationSchema = zod_1.default.object({
    body: zod_1.default.object({
        email: zod_1.default
            .string({ required_error: "Email is required" })
            .email({ message: "Invalid email address" }),
        password: zod_1.default.string({ required_error: "Password is required" }),
    }),
});
const registrationValidationSchema = zod_1.default.object({
    body: zod_1.default.object({
        fullName: zod_1.default.string().optional(),
        email: zod_1.default
            .string({ required_error: "Email is required" })
            .email({ message: "Invalid email address" }),
        password: zod_1.default
            .string({ required_error: "Password is required" })
            .min(6, "Password must be at least 6 characters"),
    }),
});
const changePasswordSchema = zod_1.default.object({
    body: zod_1.default.object({
        oldPassword: zod_1.default
            .string({ required_error: "Old Password is required" })
            .min(6, "Password must be at least 6 characters"),
        newPassword: zod_1.default
            .string({ required_error: "New Password is required" })
            .min(6, "Password must be at least 6 characters"),
        email: zod_1.default.string({ required_error: "Email is required" }),
    }),
});
const forgetPasswordSchema = zod_1.default.object({
    body: zod_1.default.object({
        email: zod_1.default.string({ required_error: "Email is required" }),
    }),
});
const resetPasswordSchema = zod_1.default.object({
    body: zod_1.default.object({
        email: zod_1.default.string({ required_error: "Email is required" }),
        token: zod_1.default.string({ required_error: "Token is required" }),
        newPassword: zod_1.default.string({ required_error: "New Password is required" }),
    }),
});
exports.authValidation = {
    loginValidationSchema,
    registrationValidationSchema,
    changePasswordSchema,
    forgetPasswordSchema,
    resetPasswordSchema,
};
