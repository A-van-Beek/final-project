import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";

const updateAmenityById = async (id, name) => {
  const prisma = new PrismaClient();
  const updatedAmenity = await prisma.amenities.updateMany({
    where: {
      id,
    },
    data: {
      name,
    },
  });

  if (!updatedAmenity || updatedAmenity.count === 0) {
    throw new NotFoundError("Amenity", id);
  }

  return {
    message: `Amenity met id ${id} is bijgewerkt !`,
  };
};

export default updateAmenityById;
