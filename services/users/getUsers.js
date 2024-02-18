import { PrismaClient } from "@prisma/client";

const getUsers = async (username, name, email, phoneNumber, profilePicture) => {
  const prisma = new PrismaClient();
  const getUsers = await prisma.users.findMany({
    where: {
      username,
      name,
      email,
      phoneNumber,
      profilePicture,
    },
  });
  if (getUsers.length === 0) {
    console.log("geen resultaat !");
  }
  return getUsers;
};

export default getUsers;
