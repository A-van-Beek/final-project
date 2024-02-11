import { PrismaClient } from "@prisma/client";
// import notFoundErrorHandler from "../middleware/notFoundErrorHandler.js";

const updateUserById = async (
  id,
  username,
  password,
  name,
  email,
  phoneNumber,
  profilePicture
) => {
  const prisma = new PrismaClient();
  const updatedUser = await prisma.users.updateMany({
    where: {
      id,
    },
    data: {
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
    },
  });

  if (!updatedUser || updatedUser.count === 0) {
    throw new NotFoundError("User", id);
  }

  return {
    message: `User met id ${id} is bijgewerkt !`,
  };
};

export default updateUserById;
