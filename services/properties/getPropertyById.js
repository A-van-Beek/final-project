import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";

const getPropertyById = async (id) => {
  const prisma = new PrismaClient();
  const property = await prisma.properties.findUnique({
    where: {
      id,
    },
    include: {
      bookings: true,
      reviews: true,
      amenities: true,
    },
  });

  if (!property) {
    throw new NotFoundError("Property", id);
  }

  return property;
};

export default getPropertyById;
