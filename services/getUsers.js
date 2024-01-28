import { PrismaClient } from "@prisma/client";

const getUsers = async (name, email) => {
  const prisma = new PrismaClient();

  return prisma.users.findMany({
    where: {
      name,
      email,
    },
  });
};

export default getUsers;
