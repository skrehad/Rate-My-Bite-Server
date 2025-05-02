import express from "express";
import { commentController } from "./comment.controller";
import validateRequest from "../../utils/validateRequest";
import { commentValidation } from "./comment.validation";
const router = express.Router();
router.get("/", commentController.getAllComment);
router.get("/:commentId", commentController.getSingleCommentbyId);
router.post(
  "/",
  validateRequest(commentValidation.createCommentSchema),
  commentController.createCommentIntoDB
);

export const commentRoutes = router;
