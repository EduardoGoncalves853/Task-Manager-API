import { randomUUID } from "node:crypto";
import { TaskDataType } from "../validations/taskSchema";
import { appError } from "../errors/appError";


export type CreateTaskDataTypes = TaskDataType & { idUser: string };
export type UpdateTaskDataTypes = TaskDataType & { id_user: string };

export type TaskRepositoryTypes = {
  createTask(data: CreateTaskDataTypes): Promise<{} | undefined>;
  getTask(id: string): Promise<UpdateTaskDataTypes | undefined>;
  updateTask(data: CreateTaskDataTypes): Promise<{} | undefined>;
  deleteTask(id: string): Promise<{} | undefined>;
};

export const taskServices = {
  async create(
    data: CreateTaskDataTypes,
    repository: TaskRepositoryTypes
  ) {
    try {
      const { title, description, date, status, idUser } = data;

      const task = {
        title,
        description,
        date,
        status,
        idUser,
      };

      const taskCreated = await repository.createTask(task);

      return taskCreated;
    } catch (error) {
      throw error;
    }
  },

  async update(taskID: string, data: CreateTaskDataTypes, repository: TaskRepositoryTypes) {
    try {
      const { title, description, date, status, idUser } = data;

      const task = {
        id: randomUUID(),
        title,
        description,
        date,
        status,
        idUser,
      };
      const userTask = await repository.getTask(taskID);
      if (!userTask) throw appError("task not found", 404);

      if(userTask.id_user != idUser){
        throw appError("user not authorized to update task", 401);
      }
      const taskUpdated = await repository.updateTask(task);

      return taskUpdated;
    } catch (error) {
      throw error;
    }
  },

  async delete(taskID: string, userID: string, repository: TaskRepositoryTypes) {
    try {

      const userTask = await repository.getTask(taskID);
      if (!userTask) throw appError("task not found", 404);

      if(userTask.id_user != userID){
        throw appError("user not authorized to delete task", 401);
      }
      const taskDelete = await repository.deleteTask(taskID);
      if (!taskDelete) throw appError("task not deleted", 500)

      return taskDelete;
    } catch (error) {
      throw error;
    }
  },
};
