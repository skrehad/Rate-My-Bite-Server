import { Request } from "express";
import { Post } from "../../../generated/prisma";
import prisma from "../../utils/prismaProvider";
import { IFile } from "../../types/file.type";
import imageUploader from "../../utils/imageUploader";

const createPost = async (req: Request) => {
  const payload = req.body as Post;
  const file = req.file as IFile;
  if (file) {
    const imageUrl = await imageUploader(file);
    payload.image = imageUrl.secure_url;
  }
  const result = await prisma.post.create({
    data: payload,
  });
  return result;
};

const getAllPost = async (query: Record<string, unknown>) => {
  const searchCondition = [];
  if (query.searchTerm) {
    console.log(query.searchTerm);
    searchCondition.push({
      OR: ["title", "category.name"].map((el) => ({
        [el]: {
          contains: query.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }
  console.dir({ searchCondition }, { depth: null });
  const result = await prisma.post.findMany({
    where: {
      AND: searchCondition,
    },
    include: {
      category: true,
    },
  });
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
