import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { userRepository } from "../repositories/userRepository";

export const userControllers = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      return res.status(201).json({ message: "user created"});
    } catch (error) {
      return next(error);
    }
  },
};
