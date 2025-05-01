import status from "http-status";
import { Comment } from "../../../generated/prisma";
import AppError from "../../errors/AppError";
import prisma from "../../utils/prismaProvider";

// -------------create comment----------
const createComment =async(payload:Comment)=>{

    const iscommentExist = await prisma.comment.findFirst({
        where: {
          userId: payload.userId,
          postId: payload.postId,
        },
      });
      if (iscommentExist) {
        throw new AppError(status.BAD_REQUEST, "You already comment this post");
      }
      const result = await prisma.comment.create({
        data: payload,
      });
      return result;
    };
// -----------find comment with id--------
const getCommentId=async(id:string)=>{
const result=await prisma.comment.findUniqueOrThrow({
    where:{id}
});
return result
}
// -----------find  all comment --------
const getAllComment=async()=>{
const result=await prisma.comment.findMany({});
return result;
}


export const commentService={
    createComment,
    getCommentId,
    getAllComment
}