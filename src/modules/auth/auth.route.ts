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

export const authRoute = route;
