import { PrismaClient } from "@prisma/client";

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
    },
    include: { amenities: true },
  });
};

export default getProperties;
