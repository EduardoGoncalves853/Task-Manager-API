import { Router } from "express";
import { taskControllers } from "../controllers/taskControllers";
import { userRoutes } from "./user.route";

export const taskRoutes = Router();

userRoutes.get("/tasks", taskControllers.read);
