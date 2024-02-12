import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";

const updateHostById = async (
  id,
  username,
  password,
  name,
  email,
  phoneNumber,
  profilePicture,
  aboutMe
) => {
  const prisma = new PrismaClient();
  const updateHost = await prisma.hosts.updateMany({
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
      aboutMe,
    },
  });

  if (!updateHost || updateHost.count === 0) {
    throw new NotFoundError("User", id);
  }

  return {
    message: `Host met id ${id} is bijgewerkt !`,
  };
};

export default updateHostById;
