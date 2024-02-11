import { PrismaClient } from "@prisma/client";

const createUser = async (
  username,
  password,
  name,
  email,
  phoneNumber,
  profilePicture
) => {
  const prisma = new PrismaClient();
  const user = await prisma.users.create({
    data: {
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
    },
  });

  return user;
};

export default createUser;
