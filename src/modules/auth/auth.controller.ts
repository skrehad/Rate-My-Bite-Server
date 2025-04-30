import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { authServices } from "./auth.service";

const loginUser = catchAsync(async (req, res) => {
  const result = await authServices.loginUser(req.body);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "User login successfully",
    data: result,
  });
});
const registerNewUser = catchAsync(async (req, res) => {
  const result = await authServices.registerNewUser(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: "User created successfully",
    data: result,
  });
});
const changePasswordWithOldPassword = catchAsync(async (req, res) => {
  const result = await authServices.changePasswordWithOldPassword(req.body);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Password changed successfully",
    data: result,
  });
});

const forgetPassword = catchAsync(async (req, res) => {
  // const result = await authServices.forgetPassword(req.body);
  const result = "";
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Password changed successfully",
    data: result,
  });
});

export const authControllers = {
  loginUser,
  registerNewUser,
  changePasswordWithOldPassword,
  forgetPassword,
};
