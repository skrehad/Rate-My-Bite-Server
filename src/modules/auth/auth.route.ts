import { Router } from "express";
import { authControllers } from "./auth.controller";
import validateRequest from "../../utils/validateRequest";
import { authValidation } from "./auth.validation";

const route = Router();

route.post(
  "/login",
  validateRequest(authValidation.loginValidationSchema),
  authControllers.loginUser
);
route.post(
  "/register",
  validateRequest(authValidation.registrationValidationSchema),
  authControllers.registerNewUser
);
route.post(
  "/change-password",
  validateRequest(authValidation.changePasswordSchema),
  authControllers.changePasswordWithOldPassword
);
route.post(
  "/forget-password",
  validateRequest(authValidation.forgetPasswordSchema),
  authControllers.forgetPassword
);
route.post(
  "/reset-password",
  validateRequest(authValidation.resetPasswordSchema),
  authControllers.resetPassword
);

export const authRoute = route;
