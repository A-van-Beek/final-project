import express from "express";
import getProperties from "../services/properties/getProperties.js";
import getPropertyById from "../services/properties/getPropertyById.js";
import authMiddleware from "../middleware/auth.js";
import notFoundErrorHandler from "../middleware/notFoundErrorHandler.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const {} = req.query;
  const users = await getProperties();
  res.status(200).json(users);
});

// router.post("/", authMiddleware, async (req, res) => {
//   const { title, author, isbn, pages, available, genre } = req.body;
//   const newBook = await createUser(
//     username,
//     name,
//     email,
//     phoneNumber,
//     profilePicture
//   );
//   res.status(201).json(newUser);
// });

router.get(
  "/:id",
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const property = await getPropertyById(id);

      res.status(200).json(property);
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler
);

// router.put(
//   "/:id",
//   authMiddleware,
//   async (req, res, next) => {
//     try {
//       const { id } = req.params;
//       const { title, author, isbn, pages, available, genre } = req.body;
//       const updatedBook = await updateBookById(
//         id,
//         title,
//         author,
//         isbn,
//         pages,
//         available,
//         genre
//       );
//       res.status(200).json(updatedBook);
//     } catch (error) {
//       next(error);
//     }
//   },
//   notFoundErrorHandler
// );

// router.delete(
//   "/:id",
//   authMiddleware,
//   async (req, res, next) => {
//     try {
//       const { id } = req.params;
//       const deletedBookId = await deleteBook(id);

//       res.status(200).json({
//         message: `Book with id ${deletedBookId} was deleted!`,
//       });
//     } catch (error) {
//       next(error);
//     }
//   },
//   notFoundErrorHandler
// );

export default router;
