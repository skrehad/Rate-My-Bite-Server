import express from 'express';
import { commentController } from './commit.controller';
const router=express.Router();
router.get("/",commentController.getAllComment);
router.get("/:id",commentController.getSingleCommentbyId);
router.post("/", commentController.createCommentIntoDB);

export const commentRoutes=router;