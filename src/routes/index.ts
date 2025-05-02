import { Router } from "express";
import { authRoute } from "../modules/auth/auth.route";
import { categoryRoute } from "../modules/category/category.route";
import { postRoute } from "../modules/post/post.route";
import { adminRoute } from "../modules/admin/admin.route";
import { userRoute } from "../modules/user/user.route";
import { ratingRoutes } from "../modules/Rating/rating.routes";
import { voteRoutes } from "../modules/Vote/vote.route";
import { commentRoutes } from "../modules/comment/comment.routes";

const route = Router();
const modules = [
  { path: "/auth", route: authRoute },
  { path: "/category", route: categoryRoute },
  { path: "/post", route: postRoute },
  { path: "/admin", route: adminRoute },
  { path: "/user", route: userRoute },
  { path: "/rating", route: ratingRoutes },
  { path: "/vote", route: voteRoutes },
  { path: "/comments", route: commentRoutes },
];

modules.forEach((module) => {
  route.use(module.path, module.route);
});

export default route;
