import { Router } from "express";
import { adminControllers } from "./admin.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma";

const route = Router();

route.get(
  "/dashboard",
  auth(UserRole.ADMIN),
  adminControllers.getAdminCredentials
);

export const adminRoute = route;
