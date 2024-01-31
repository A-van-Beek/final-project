import { PrismaClient } from "@prisma/client";

const getProperties = async () => {
  const prisma = new PrismaClient();

  return prisma.properties.findMany({
    where: {},
  });
};

export default getProperties;
