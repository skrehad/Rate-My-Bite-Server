import {  Vote } from "../../../generated/prisma";
import prisma from "../../utils/prismaProvider";

const createVote= async (payload: Vote) => {
  const result = await prisma.vote.create({
    data: {
      status: payload.status,
      user: { connect: { id: payload.userId } }, 
      post: { connect: { id: payload.postId } }
    },
  });
  return result;
};

// ---------all vote-------
const getAllVote = async () => {
  const result = await prisma.vote.findMany({});
  return result;
};

// ----------get single vote----------
const getSingleVote=async(id:string)=>{
  const result=await prisma.vote.findUniqueOrThrow({
    where:{id}
  });
  return result;
}
export const voteServices = {
  createVote,
  getAllVote,
  getSingleVote
};
