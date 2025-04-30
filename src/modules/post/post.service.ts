import { Post } from "../../../generated/prisma";
import prisma from "../../utils/prismaProvider";

const createPost = async (payload: Post) => {
  const result = await prisma.post.create({
    data: payload,
  });
  return result;
};

const getAllPost = async () => {
  const result = await prisma.post.findMany({});
  return result;
};
const getSinglePost = async (id: string) => {
  const result = await prisma.post.findUnique({
    where: {
      id,
    },
  });
  return result;
};

export const postServices = {
  createPost,
  getAllPost,
  getSinglePost,
};
