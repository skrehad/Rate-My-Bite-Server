import { Router } from "express";
import { authRoute } from "../modules/auth/auth.route";
import { categoryRoute } from "../modules/category/category.route";
import { postRoute } from "../modules/post/post.route";
import { adminRoute } from "../modules/admin/admin.route";

const route = Router();
const modules = [
  { path: "/auth", route: authRoute },
  { path: "/category", route: categoryRoute },
  { path: "/post", route: postRoute },
  { path: "/admin", route: adminRoute },
];

modules.forEach((module) => {
  route.use(module.path, module.route);
});

export default route;
