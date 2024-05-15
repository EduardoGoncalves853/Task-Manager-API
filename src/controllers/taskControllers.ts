import { Request, Response, NextFunction } from "express";

export const taskControllers = {
  async read(req: Request, res: Response, next: NextFunction) {
    try {
      return res.status(200).json({
        message: "task!",
      });
    } catch (error) {
      return next(error);
    }
  },
};
