import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";

const getProperties = async (
  title,
  description,
  location,
  pricePerNight,
  bedroomCount,
  bathRoomCount,
  maxGuestCount,
  hostId,
  rating,
  amenities
) => {
  const prisma = new PrismaClient();
  return prisma.properties.findMany({
    where: {
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      hostId,
      rating,
      amenities: {
        some: {
          name: { equals: amenities },
        },
      },
    },
    include: { amenities: true },
  });
};

export default getProperties;
