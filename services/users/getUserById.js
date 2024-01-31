import { PrismaClient } from "@prisma/client";
// import NotFoundError from "../../middleware/notFoundErrorHandler";

const getUserById = async (id) => {
  const prisma = new PrismaClient();
  const user = await prisma.users.findUnique({
    where: {
      id,
    },
  });

  // if (!user) {
  //   throw new NotFoundError("User", id);
  // }

  return user;
};

export default getUserById;
