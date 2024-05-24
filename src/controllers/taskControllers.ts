import { Request, Response, NextFunction } from "express";
import { taskSchema } from "../validations/taskSchema";
import { taskServices } from "../services/taskServices";
import { taskRepository } from "../repositories/taskRepositories";

export const taskControllers = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, description, date, status } = taskSchema.parse(req.body);
      const userID = req.userID;

      const taskCreated = {
        title,
        description,
        date,
        status,
        idUser: userID,
      };
      return res.status(200).json({ message: "tasks!", taskCreated });
    } catch (error) {
      return next(error);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, description, date, status } = taskSchema.parse(req.body);
      const userID = req.userID;
      const { taskID } = req.params;

      const task = {
        title,
        description,
        date,
        status,
        idUser: userID,
      };

      const taskUpdate = await taskServices.update(
        taskID,
        task,
        taskRepository
      );

      return taskUpdate;
    } catch (error) {
      return next(error);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const userID = req.userID;
      const { taskID } = req.params;

      const taskDeleted = await taskServices.delete(
        taskID,
        userID,
        taskRepository
      );

      return res.status(200).json({ message: "task deleted!", taskDeleted });
    } catch (error) {
      return next(error);
    }
  },
};
