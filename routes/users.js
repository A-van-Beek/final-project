import express from "express";
import getUsers from "../services/getUsers.js";
// import getUserById from "../services/getUsers.js";
// import authMiddleware from "../middleware/auth.js";
// import notFoundErrorHandler from "../middleware/notFoundErrorHandler.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const { name, email } = req.query;
  const users = await getUsers(name, email);
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
// let op: nog aanpassen vanuit book !!
// router.get(
//   "/:id",
//   async (req, res, next) => {
//     try {
//       const { id } = req.params;
//       const book = await getBookById(id);

//       res.status(200).json(book);
//     } catch (error) {
//       next(error);
//     }
//   },
//   notFoundErrorHandler
// );

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
