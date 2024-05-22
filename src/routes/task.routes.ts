import { Router } from "express";
import { taskControllers } from "../controllers/taskControllers";
import { userRoutes } from "./user.routes";
import { authMiddleware } from "../middlewares/authMiddleware";

export const taskRoutes = Router();

userRoutes.get("/tasks", authMiddleware, taskControllers.create);
