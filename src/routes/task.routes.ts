import { Router } from "express";
import { taskControllers } from "../controllers/taskControllers";
import { userRoutes } from "./user.routes";

export const taskRoutes = Router();

userRoutes.get("/tasks", taskControllers.read);
