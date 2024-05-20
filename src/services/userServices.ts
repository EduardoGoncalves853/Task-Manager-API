import { UserDataType } from "../validations/userSchema";
import { randomUUID } from "node:crypto";
import { hash } from "bcrypt";
import { CreateUserDataType } from "../repositories/userRepositories";

type Repository = {
  createUser(data: UserDataType): Promise<{} | undefined>
}

export const userServices = {
  async create(data: UserDataType, repository: Repository) {
    try {
      const { name, email, password } = data;
      const passwordHash = await hash(password, 10);
      const user = {
        id: randomUUID(),
        name,
        email,
        password: passwordHash,
      };

      const userCreated = await repository.createUser(user)

      return userCreated
    } catch (error) {
      throw error
    }
  },
};
