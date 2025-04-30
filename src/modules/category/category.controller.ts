import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { categoryServices } from "./category.service";

const createCategory = catchAsync(async (req, res) => {
  const result = await categoryServices.createCategoty(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: "Category created successfully",
    data: result,
  });
});
const getAllCategory = catchAsync(async (req, res) => {
  const result = await categoryServices.getAllCategory();
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Category retrived successfully",
    data: result,
  });
});

export const categoryControllers = {
  createCategory,
  getAllCategory,
};
