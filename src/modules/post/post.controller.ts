import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { postServices } from "./post.service";

const createPost = catchAsync(async (req, res) => {
  const result = await postServices.createPost(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: "Post created successfully",
    data: result,
  });
});

const getAllPost = catchAsync(async (req, res) => {
  const result = await postServices.getAllPost();
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Posts retrived successfully",
    data: result,
  });
});

const getSinglePost = catchAsync(async (req, res) => {
  const { postId } = req.params;
  const result = await postServices.getSinglePost(postId);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Post retrived successfully",
    data: result,
  });
});

export const postControllers = {
  createPost,
  getAllPost,
  getSinglePost,
};
