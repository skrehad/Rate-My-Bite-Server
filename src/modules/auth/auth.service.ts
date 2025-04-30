import status from "http-status";
import { User } from "../../../generated/prisma";
import AppError from "../../errors/AppError";
import prisma from "../../utils/prismaProvider";
import { bcryptHelper } from "../../utils/bcryptHelper";
import { jwtHelper } from "../../utils/jwtHelper";
import config from "../../config";

const loginUser = async (payload: Partial<User>) => {
  const isUserExist = await prisma.user.findUnique({
    where: { email: payload?.email },
  });
  if (!isUserExist) {
    throw new AppError(status.BAD_REQUEST, "User does not exist");
  }
  const isPasswordMatch = await bcryptHelper.comparePassword(
    payload?.password as string,
    isUserExist?.password
  );
  if (!isPasswordMatch) {
    throw new AppError(status.BAD_REQUEST, "Password does not match");
  }
  const jwtData = {
    email: isUserExist?.email,
    status: isUserExist?.status,
    role: isUserExist?.role,
  };
  const accessToken = jwtHelper.generateToken(
    jwtData,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );
  const refreshToken = jwtHelper.generateToken(
    jwtData,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string
  );
  return {
    accessToken,
    refreshToken,
  };
};
const registerNewUser = async (payload: User) => {
  const isUserExist = await prisma.user.findUnique({
    where: { email: payload?.email },
  });
  if (isUserExist) {
    throw new AppError(status.BAD_REQUEST, "User already exist");
  }
  const hashedPassword = await bcryptHelper.hashPassword(payload?.password);
  payload.password = hashedPassword;
  const result = await prisma.user.create({
    data: payload,
  });
  const jwtData = {
    email: result?.email,
    status: result?.status,
    role: result?.role,
  };
  const accessToken = jwtHelper.generateToken(
    jwtData,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );
  const refreshToken = jwtHelper.generateToken(
    jwtData,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string
  );
  return {
    accessToken,
    refreshToken,
  };
};

export const authServices = {
  loginUser,
  registerNewUser,
};
