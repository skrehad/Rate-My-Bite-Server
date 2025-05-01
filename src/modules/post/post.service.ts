import { JwtPayload } from "jsonwebtoken";
import { Post, PostStatus, Prisma, UserRole } from "../../../generated/prisma";
import config from "../../config";
import { jwtHelper } from "../../utils/jwtHelper";
import prisma from "../../utils/prismaProvider";

const createPost = async (payload: Post) => {
  // const payload = req.body as Post;
  // const file = req.file as IFile;
  // if (file) {
  //   const imageUrl = await imageUploader(file);
  //   payload.image = imageUrl.secure_url;
  // }
  const result = await prisma.post.create({
    data: payload,
  });
  return result;
};

const createMany = async (payload: Post[]) => {
  const result = await prisma.post.createMany({
    data: payload,
  });
  return result;
};

const getAllPost = async (
  query: Record<string, unknown>,
  paginateQuery: Record<string, unknown>,
  priceQuery: Record<string, unknown>,
  token: string = ""
) => {
  const queryCondition: Prisma.PostWhereInput[] = [
    {
      status: PostStatus.APPROVED,
    },
  ];
  if (token) {
    const decodedToken = jwtHelper.decodedToken(
      token,
      config.jwt_access_secret as string
    ) as JwtPayload;
    if (decodedToken?.role === UserRole.PREMIUM) {
      queryCondition.push({});
    } else {
      queryCondition.push({
        isPremium: false,
      });
    }
  } else {
    queryCondition.push({
      isPremium: false,
    });
  }

  const { searchTerm, ...fieldsValues } = query;
  const { page = 1, limit = 10 } = paginateQuery;
  const { minPrice = 0, maxPrice = 1000000 } = priceQuery;
  if (searchTerm) {
    queryCondition.push({
      OR: [
        { title: { contains: searchTerm as string, mode: "insensitive" } },
        {
          description: { contains: searchTerm as string, mode: "insensitive" },
        },
        {
          category: {
            name: { contains: searchTerm as string, mode: "insensitive" },
          },
        },
      ],
    });
  }
  if (Object.keys(fieldsValues).length > 0) {
    queryCondition.push({
      AND: Object.keys(fieldsValues).map((key) => {
        if (key === "category") {
          return {
            [key]: {
              name: {
                equals: fieldsValues[key] as string,
              },
            },
          };
        }
        return {
          [key]: {
            equals: fieldsValues[key] as string | number | boolean,
          },
        };
      }),
    });
  }

  queryCondition.push({
    price: {
      gte: Number(minPrice),
      lte: Number(maxPrice),
    },
  });

  const skip = (Number(page) - 1) * Number(limit);
  const whereCondition = { AND: queryCondition };
  console.dir(queryCondition, { depth: null });
  const result = await prisma.post.findMany({
    where: whereCondition,
    take: Number(limit),
    skip,
  });
  return {
    data: result,
    meta: {
      total: await prisma.post.count({ where: whereCondition }),
      page: Number(page),
      limit: Number(limit),
    },
  };
};

const getAllPostByAdmin = async (paginateQuery: Record<string, unknown>) => {
  const { page = 1, limit = 10 } = paginateQuery;
  const skip = (Number(page) - 1) * Number(limit);
  console.log({ page, limit, skip });
  const result = await prisma.post.findMany({
    take: Number(limit),
    skip,
  });
  return {
    data: result,
    meta: {
      total: await prisma.post.count({}),
      page: Number(page),
      limit: Number(limit),
    },
  };
};
const getSinglePost = async (id: string) => {
  const result = await prisma.post.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const updatePost = async (id: string, payload: Partial<Post>) => {
  const result = await prisma.post.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

export const postServices = {
  createPost,
  createMany,
  getAllPost,
  getSinglePost,
  updatePost,
  getAllPostByAdmin,
};
