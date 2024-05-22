import { compare } from "bcrypt";
import { LoginDataType } from "../validations/loginSchema";
import { UserRepositoryTypes } from "./userServices";
import { appErrors } from "../errors/appError";
import { sign } from "jsonwebtoken";

type Repository = {
  getUserByEmail(email: string): Promise<{} | undefined>;
};

export const authServices = {
  async login(data: LoginDataType, repository: UserRepositoryTypes) {
    try {
      const { email, password } = data;
      const user = await repository.getUserByEmail(email);
      if (!user) throw appErrors("Email or password invalid!", 401);

      const passwordCheck = await compare(password, user.password);
      if (!passwordCheck) throw appErrors("Email invalid", 401);

      const token = sign({ id: user.id }, process.env.SECRET_TOKEN, {
        expiresIn: process.env.EXPIRESIN_TOKEN,
      });

      return token;
    } catch (error) {
      throw error;
    }
  },
};
