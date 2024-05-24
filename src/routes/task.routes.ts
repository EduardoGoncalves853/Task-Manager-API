import { Router } from "express";
import { taskControllers } from "../controllers/taskControllers";
import { authMiddleware } from "../middlewares/authMiddleware";

export const taskRoutes = Router();

taskRoutes.use(authMiddleware)

taskRoutes.get("/task", authMiddleware, taskControllers.create);
taskRoutes.get("/task/:taskID", authMiddleware, taskControllers.update);
taskRoutes.delete("/task/:taskID", taskControllers.delete);
