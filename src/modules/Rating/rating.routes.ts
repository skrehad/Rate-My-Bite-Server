import express from 'express';
import { ratingController } from './rating.controller';




const router=express.Router();


router.get("/",ratingController.getAllRating);
router.get("/:id",ratingController.getSingleRating);
router.post("/", ratingController.createRatingIntoDB);

export const ratingRoutes=router;