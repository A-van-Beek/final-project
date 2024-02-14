// import { PrismaClient } from "@prisma/client";
// import NotFoundError from "../../errors/NotFoundError.js";

// const getUserBookings = async (id) => {
//   const prisma = new PrismaClient();
//   // console.log("Debugging: Voor het ophalen van gebruikersbestellingen");
//   try {
//     const userBookings = await prisma.bookings.findUnique({
//       where: {
//         userId: id,
//       },
//     });

//     if (!userBookings) {
//       throw new NotFoundError("User", id);
//     }
//     return userBookings;
//   } catch (error) {
//     // console.error("Fout tijdens het ophalen van gebruikersbestellingen", error);
//     throw error;
//   }
// };

// export default getUserBookings;
import { PrismaClient } from "@prisma/client";

const getUserBookings = async (id) => {
  const prisma = new PrismaClient();

  return prisma.bookings.findMany({
    where: { userId: id },
  });
};

export default getUserBookings;
