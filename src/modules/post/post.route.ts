import { Router } from "express";
import { postControllers } from "./post.controller";
import validateRequest from "../../utils/validateRequest";
import { postValidation } from "./post.validation";
import auth from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma";
const route = Router();

// route.post(
//   "/",
//   upload.single("file"),
//   (req: Request, _res: Response, next: NextFunction) => {
//     req.body = JSON.parse(req?.body?.data);
//     next();
//   },
//   postControllers.createPost
// );
route.post(
  "/",
  validateRequest(postValidation.postSchema),
  postControllers.createPost
);
route.post(
  "/many",
  validateRequest(postValidation.manyPostSchema),
  postControllers.createMany
);
route.get("/", postControllers.getAllPost);
route.get("/admin", auth(UserRole.ADMIN), postControllers.getAllPostByAdmin);
route.get("/:postId", postControllers.getSinglePost);

route.patch(
  "/:postId/update-status",
  auth(UserRole.ADMIN),
  postControllers.updatePost
);

export const postRoute = route;
