import prisma from "../../utils/prismaProvider";

const getAdminCredentials = async () => {
  const totasPosts = await prisma.post.count({});
  const totalUsers = await prisma.user.count({});
  const totalSubscribers = await prisma.user.count({
    where: {
      isPremium: true,
    },
  });
  const totalComments = await prisma.comment.count({});
  const totalCategories = await prisma.category.count({});
  const totalRatings = await prisma.rating.count({});
  const totalVotes = await prisma.vote.count({});
  return {
    totalPosts: totasPosts,
    totalUsers: totalUsers,
    totalSubscribers,
    totalComments,
    totalCategories,
    totalRatings,
    totalVotes,
  };
};

export const adminServices = {
  getAdminCredentials,
};
