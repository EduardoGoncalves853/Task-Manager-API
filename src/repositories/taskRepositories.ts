import { sqliteconection } from "../databases/sqlite3";
import { CreateTaskDataTypes, TaskRepositoryTypes } from "../services/taskServices";

type CreateTaskDataType = CreateTaskDataTypes & { id: string };

export const taskRepository = {
  async createTask(data: CreateTaskDataType, repository: TaskRepositoryTypes) {
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

  async getTask(id: string) {
    try {
      const db = await sqliteconection();

      const querySQL =
        "INSERT INTO Tasks (id, title, description, date, status, id_user) VALUES(?,?,?,?,?) ";

      const task = await db.run(querySQL, [id]);

      return task;
    } catch (error) {
      throw error;
    }
  },

  async updateTask(data: CreateTaskDataType) {
    try {
      const { id, title, description, date, status } = data;

      const db = await sqliteconection();

      const querySQL = `
      UPDATE tasks
      SET title = ?, description = ?, date = ?, status = ?
      WHERE id = ?;`;

      await db.run(querySQL, [title, description, date, status, id])

      return { id }
    } catch (error) {
      throw error;
    }
  },

  async deleteTask(id: string) {
    try {
      const db = await sqliteconection();

      const querySQL = "DELETE FROM task WHERE id = ?;";

      await db.run(querySQL, [id])

      return { id }
    } catch (error) {
      throw error;
    }
  },
};
