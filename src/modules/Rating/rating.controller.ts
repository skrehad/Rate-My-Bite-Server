import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { RatingService } from "./rating.service";
import sendResponse from "../../utils/sendResponse";
import status from "http-status";

/* 
-----------------------**************-------------
                      ceate rating
-----------------------***************----------
*/
const createRatingIntoDB = catchAsync(async (req: Request , res: Response) => {
  
   const result = await RatingService.createRatingIntoDB( req.body);

   sendResponse(res, {
      success: true,
      statusCode: status.OK,
      message: "Rating created successfully",
      data: result
   });
});

const getAllRating= catchAsync(async (req: Request , res: Response) => {
  
   const result = await RatingService.getAllRating( );

   sendResponse(res, {
      success: true,
      statusCode: status.OK,
      message: "Rating get successfully",
      data: result
   });
});
const getSingleRating= catchAsync(async (req: Request , res: Response) => {
  
   const {id}=req.params;
   const result=await RatingService.getSingleRating(id);

   sendResponse(res, {
      success: true,
      statusCode: status.OK,
      message: "Rating get id successfully",
      data: result
   });
});

// const createRatingIntoDB = catchAsync(async (req: Request & { user?: IAuthUser }, res: Response) => {
//    const user = req.user;
//    const result = await RatingService.createRatingIntoDB(user as IAuthUser, req.body);

//    sendResponse(res, {
//       success: true,
//       statusCode: status.OK,
//       message: "Rating created successfully",
//       data: result
//    });
// });

export const ratingController={
   createRatingIntoDB,
   getAllRating,
   getSingleRating
}