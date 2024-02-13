import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";

const updateBookingById = async (
  id,
  userId,
  propertyId,
  checkinDate,
  checkoutDate,
  numberOfGuests,
  totalPrice,
  bookingStatus
) => {
  const prisma = new PrismaClient();
  const updatedBooking = await prisma.bookings.updateMany({
    where: {
      id,
    },
    data: {
      userId,
      propertyId,
      checkinDate,
      checkoutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus,
    },
  });

  if (!updatedBooking || updatedBooking.count === 0) {
    throw new NotFoundError("Booking", id);
  }

  return {
    message: `Booking met id ${id} is bijgewerkt !`,
  };
};

export default updateBookingById;
