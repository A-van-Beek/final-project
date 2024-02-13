import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";
// review Review
const updateReviewById = async (id, userId, propertyId, rating, comment) => {
  const prisma = new PrismaClient();
  const updatedReview = await prisma.reviews.updateMany({
    where: {
      id,
    },
    data: {
      userId,
      propertyId,
      rating,
      comment,
    },
  });

  if (!updatedReview || updatedReview.count === 0) {
    throw new NotFoundError("Review", id);
  }

  return {
    message: `Review met id ${id} is bijgewerkt !`,
  };
};

export default updateReviewById;
