import { Router } from "express";
import { postControllers } from "./post.controller";

const route = Router();

route.post("/", postControllers.createPost);
route.get("/", postControllers.getAllPost);
route.get("/:postId", postControllers.getSinglePost);

export const postRoute = route;
