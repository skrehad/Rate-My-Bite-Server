import { NextFunction, Request, Response } from "express";
import { UserRole } from "../../generated/prisma";
import AppError from "../errors/AppError";
import status from "http-status";
import { jwtHelper } from "../utils/jwtHelper";
import config from "../config";
import { JwtPayload } from "jsonwebtoken";

const auth = (...roles: UserRole[]) => {
  return async (
    req: Request & { user: JwtPayload },
    _res: Response,
    next: NextFunction
  ) => {
    const token = req.headers?.authorization;
    if (!token) {
      throw new AppError(status.UNAUTHORIZED, "You are not authorized");
    }
    const decoded = jwtHelper.decodedToken(
      token,
      config.jwt_access_secret as string
    );
    if (!decoded) {
      throw new AppError(status.UNAUTHORIZED, "You are not authorized");
    }
    if (!roles.includes((decoded as JwtPayload)?.role as UserRole)) {
      throw new AppError(status.UNAUTHORIZED, "You are not authorized");
    } else {
      req.user = decoded as JwtPayload;
      next();
    }
  };
};

export default auth;
