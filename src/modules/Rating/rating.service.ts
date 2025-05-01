
import { Rating } from "../../../generated/prisma";

import prisma from '../../utils/prismaProvider';

/* 
-----------------------**************-------------
                      ceate rating
-----------------------***************---------- */


const createRatingIntoDB = async (payload: Rating) => {
  const result = await prisma.rating.create({
    data: {
      userId: payload.userId,
      postId: payload.postId,
      value: payload.value,
    },
  });
  return result;
};

/* 
-----------------------**************-------------
                      get rating
-----------------------***************----------
*/

const getAllRating=async()=>{
    const AllRatingresult=await prisma.rating.findMany();
    return AllRatingresult;
}

/* 
-----------------------**************-------------
                      get single rating
-----------------------***************----------
*/
const getSingleRating=async(id:string)=>{

    const getSingleRatingresult=await prisma.rating.findUniqueOrThrow({
        where:{id}
    });
    return getSingleRatingresult;
}

export const RatingService = {
  createRatingIntoDB,
  getAllRating,
  getSingleRating
};
