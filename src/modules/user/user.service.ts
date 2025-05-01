import { User } from "../../../generated/prisma";
import prisma from "../../utils/prismaProvider";

const getAllUser = async () => {
  const result = await prisma.user.findMany({});
  return result;
};

const getSingleUser = async (id: string) => {
  const result = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const updateUser = async (id: string, payload: Partial<User>) => {
  const result = await prisma.user.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

export const userServices = {
  getAllUser,
  updateUser,
  getSingleUser,
};
