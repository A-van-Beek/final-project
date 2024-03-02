import { PrismaClient } from "@prisma/client";
import { extractRequestData } from "@sentry/node";

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
      bookings: bookings
        ? {
            some: {
              id: { equals: bookings },
            },
          }
        : undefined,
      reviews: reviews
        ? {
            some: {
              id: { equals: reviews },
            },
          }
        : undefined,
      amenities: amenities
        ? {
            some: {
              name: { equals: amenities },
            },
          }
        : undefined,
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
