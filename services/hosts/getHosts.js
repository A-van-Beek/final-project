import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";

const getHosts = async (name) => {
  const prisma = new PrismaClient();
  console.log(name);
  const host = await prisma.hosts.findMany({
    where: { name },
  });

  //findmany geeft een array !
  if (host.length === 0) {
    throw new NotFoundError("Host", name);
  }

  return host;
};

export default getHosts;
