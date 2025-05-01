import { Comment } from "../../../generated/prisma";
import prisma from "../../utils/prismaProvider";

// -------------create comment----------
const createComment =async(payload:Comment)=>{

    const result=await prisma.comment.create({
        data:{
            userId:payload.id,
            postId: payload.id,
            text: payload.text
        }
    });

    return result

}
// -----------find comment with id--------
const getCommentId=async(id:string)=>{
const result=await prisma.comment.findUniqueOrThrow({
    where:{id}
});
return result
}
// -----------find  all comment --------
const getAllComment=async(id:string)=>{
const result=await prisma.comment.findMany();
return result;
}


export const commentService={
    createComment,
    getCommentId,
    getAllComment
}