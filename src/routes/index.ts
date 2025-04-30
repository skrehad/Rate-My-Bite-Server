import { Router } from "express";
import { authRoute } from "../modules/auth/auth.route";
import { categoryRoute } from "../modules/category/category.route";
import { postRoute } from "../modules/post/post.route";

const route = Router();
const modules = [
  { path: "/auth", route: authRoute },
  { path: "/category", route: categoryRoute },
  { path: "/post", route: postRoute },
];

modules.forEach((module) => {
  route.use(module.path, module.route);
});

export default route;
