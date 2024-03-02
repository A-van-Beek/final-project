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
  bookings,
  reviews,
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
    },
    include: {
      bookings: true,
      reviews: true,
      amenities: true,
    },
  });
  if (getProperties.length === 0) {
    console.log("geen resultaat !");
  }

  return getProperties;
};

export default getProperties;
