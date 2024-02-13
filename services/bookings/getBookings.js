import { PrismaClient } from "@prisma/client";

const getBookings = async () => {
  const prisma = new PrismaClient();

  return prisma.bookings.findMany({
    where: {},
  });
};

export default getBookings;
