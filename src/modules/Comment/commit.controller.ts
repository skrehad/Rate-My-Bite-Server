import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";

import sendResponse from "../../utils/sendResponse";
import status from "http-status";
import { RatingService } from "../Rating/rating.service";
import { commentService } from "./commit.service";

/* 
-----------------------**************-------------
                      ceate comment
-----------------------***************----------
*/
const createCommentIntoDB = catchAsync(async (req: Request , res: Response) => {
  
   const result = await commentService.createComment(req.body);

   sendResponse(res, {
      success: true,
      statusCode: status.OK,
      message: "comment created successfully",
      data: result
   });
});
// ---------get all
const getAllComment= catchAsync(async (req: Request , res: Response) => {
  
   const result = await commentService.getAllComment();

   sendResponse(res, {
      success: true,
      statusCode: status.OK,
      message: "Comment getd successfully",
      data: result
   });
});
// ------------------get single------------
const getSingleCommentbyId= catchAsync(async (req: Request , res: Response) => {
  
   const {id}=req.params;
   const result=await commentService.getCommentId(id);

   sendResponse(res, {
      success: true,
      statusCode: status.OK,
      message: "comment get id successfully",
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

export const commentController={
   getSingleCommentbyId,
   getAllComment,
   createCommentIntoDB
}