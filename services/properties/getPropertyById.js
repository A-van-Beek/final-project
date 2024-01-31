import { PrismaClient } from "@prisma/client";
// import NotFoundError from "../../middleware/notFoundErrorHandler";

const getPropertyById = async (id) => {
  const prisma = new PrismaClient();
  const property = await prisma.properties.findUnique({
    where: {
      id,
    },
  });

  // if (!host) {
  //   throw new NotFoundError("Host", id);
  // }

  return property;
};

export default getPropertyById;
