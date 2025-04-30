import { NextFunction, Request, Response, Router } from "express";
import { postControllers } from "./post.controller";
import { upload } from "../../middlewares/multerUpload";

const route = Router();

route.post(
  "/",
  upload.single("file"),
  (req: Request, _res: Response, next: NextFunction) => {
    req.body = JSON.parse(req?.body?.data);
    next();
  },
  postControllers.createPost
);
route.get("/", postControllers.getAllPost);
route.get("/:postId", postControllers.getSinglePost);

export const postRoute = route;
