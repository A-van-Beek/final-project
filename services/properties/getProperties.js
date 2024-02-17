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
  const getProperties = await prisma.properties.findMany({
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
  if (getProperties.length === 0) {
    console.log("geen resultaat !");
  }

  return getProperties;
};

export default getProperties;
