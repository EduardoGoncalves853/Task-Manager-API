import { Request, Response, NextFunction } from "express";
import { appError } from "../errors/appError";
import { JwtPayload, verify } from "jsonwebtoken";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { cookie } = req.headers;
  if (!cookie) return;

  const [key, token] = cookie.split("=");
  // verificação de token e key
  if (key != process.env.KEY_TOKEN) throw appError("badly key token!", 401);
  if (!token) throw appError("Token is required!", 401);

  verify(token, process.env.KEY_TOKEN, (error, decoded) => {
    if (error) throw res.status(401).json({ message: error.message || "token error!" });
    const {id} = decoded as JwtPayload
    req.userID = id;
    return next();
  });

}
