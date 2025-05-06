"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const comment_controller_1 = require("./comment.controller");
const validateRequest_1 = __importDefault(require("../../utils/validateRequest"));
const comment_validation_1 = require("./comment.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const prisma_1 = require("../../../generated/prisma");
const router = express_1.default.Router();
router.get("/my-comments", (0, auth_1.default)(prisma_1.UserRole.PREMIUM, prisma_1.UserRole.USER), comment_controller_1.commentController.getAllUsersComment);
router.get("/", comment_controller_1.commentController.getAllComment);
router.get("/:commentId", comment_controller_1.commentController.getSingleCommentbyId);
router.post("/", (0, validateRequest_1.default)(comment_validation_1.commentValidation.createCommentSchema), comment_controller_1.commentController.createCommentIntoDB);
exports.commentRoutes = router;
