import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";

const deleteHost = async (id) => {
  const prisma = new PrismaClient();

  const deleteHost = await prisma.hosts.deleteMany({
    where: {
      id,
    },
  });

  if (!deleteHost || deleteHost.count === 0) {
    throw new NotFoundError("Host", id);
  }

  return id;
};
export default deleteHost;
