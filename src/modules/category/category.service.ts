import { Category } from "../../../generated/prisma";
import prisma from "../../utils/prismaProvider";

const createCategoty = async (payload: Category) => {
  const isCategoryExist = await prisma.category.findUnique({
    where: { name: payload?.name },
  });
  if (isCategoryExist) {
    throw new Error("Category already exist");
  }
  const result = await prisma.category.create({
    data: payload,
  });
  return result;
};

const getAllCategory = async () => {
  const result = await prisma.category.findMany({});
  return result;
};

export const categoryServices = {
  createCategoty,
  getAllCategory,
};
