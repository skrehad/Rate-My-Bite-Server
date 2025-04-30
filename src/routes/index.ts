import { Router } from "express";
import { authRoute } from "../modules/auth/auth.route";

const route = Router();
const modules = [{ path: "/auth", route: authRoute }];

modules.forEach((module) => {
  route.use(module.path, module.route);
});

export default route;
