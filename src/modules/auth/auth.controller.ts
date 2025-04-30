import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { authServices } from "./auth.service";

const loginUser = catchAsync(async (req, res) => {
  const result = await authServices.loginUser(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User login successfully",
    data: result,
  });
});
const registerNewUser = catchAsync(async (req, res) => {
  const result = await authServices.registerNewUser(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User created successfully",
    data: result,
  });
});

export const authControllers = {
  loginUser,
  registerNewUser,
};
