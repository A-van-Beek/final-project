import { PrismaClient } from "@prisma/client";

const getReviews = async () => {
  const prisma = new PrismaClient();

  return prisma.reviews.findMany({
    where: {},
  });
};

export default getReviews;
