import { PrismaClient } from "@prisma/client";

const getHosts = async () => {
  const prisma = new PrismaClient();

  return prisma.hosts.findMany({
    where: {},
  });
};

export default getHosts;
