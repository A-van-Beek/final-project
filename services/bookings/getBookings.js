import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";

const getBookings = async (userId) => {
  const prisma = new PrismaClient();

  const getBookings = await prisma.bookings.findMany({
    where: { userId },
  });
  if (!getBookings) {
    throw new NotFoundError("Booking", userId);
  }
  if (getBookings.length === 0) {
    console.log("geen resultaat voor userId! ", userId);
  }
  return getBookings;
};

export default getBookings;
