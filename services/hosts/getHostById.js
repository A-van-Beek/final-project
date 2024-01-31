import { PrismaClient } from "@prisma/client";
// import NotFoundError from "../../middleware/notFoundErrorHandler";

const getHostById = async (id) => {
  const prisma = new PrismaClient();
  const host = await prisma.hosts.findUnique({
    where: {
      id,
    },
  });

  // if (!host) {
  //   throw new NotFoundError("Host", id);
  // }

  return host;
};

export default getHostById;
