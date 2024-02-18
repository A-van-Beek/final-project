import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";
import NoResultError from "../../errors/NoResultError.js";

const getHosts = async (
  username,
  name,
  email,
  phoneNumber,
  profilePicture,
  aboutMe
) => {
  const prisma = new PrismaClient();
  const host = await prisma.hosts.findMany({
    where: { username, name, email, phoneNumber, profilePicture, aboutMe },
  });

  //findmany geeft een array !
  if (host.length === 0) {
    throw new NoResultError("Hosts:");
  }

  return host;
};

export default getHosts;
