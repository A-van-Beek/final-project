import { PrismaClient } from "@prisma/client";

const getAmenities = async () => {
  const prisma = new PrismaClient();

  return prisma.amenities.findMany({
    where: {},
  });
};

export default getAmenities;
