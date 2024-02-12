import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";

const updatePropertyById = async (
  id,
  title,
  description,
  location,
  pricePerNight,
  bedroomCount,
  bathRoomCount,
  maxGuestCount,
  hostId,
  rating
) => {
  const prisma = new PrismaClient();
  const updatedProperty = await prisma.properties.updateMany({
    where: {
      id,
    },
    data: {
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      hostId,
      rating,
    },
  });

  if (!updatedProperty || updatedProperty.count === 0) {
    throw new NotFoundError("User", id);
  }

  return {
    message: `Property met id ${id} is bijgewerkt !`,
  };
};

export default updatePropertyById;
