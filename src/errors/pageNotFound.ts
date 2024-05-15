import { Request, Response, NextFunction } from "express";

export function pageNotFound(req: Request, res: Response, next: NextFunction) {
    //  tipa a variável como "as Error"
    const error = new Error("Page not found") as Error & {status : number};
    error.status = 404 ;
    return next(error);
}
