import { Router } from "express";
import { categoryControllers } from "./category.controller";

const route = Router();

route.get("/", categoryControllers.getAllCategory);
route.post("/", categoryControllers.createCategory);
export const categoryRoute = route;
