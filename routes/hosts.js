import express from "express";
import getHosts from "../services/hosts/getHosts.js";
import getHostById from "../services/hosts/getHostById.js";
import authMiddleware from "../middleware/auth.js";
import notFoundErrorHandler from "../middleware/notFoundErrorHandler.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const {} = req.query;
  const hosts = await getHosts();
  res.status(200).json(hosts);
});

router.post("/", authMiddleware, async (req, res) => {
  const {
    username,
    password,
    name,
    email,
    phoneNumber,
    profilePicture,
    aboutMe,
  } = req.body;
  const newHost = await createUser(
    username,
    password,
    name,
    email,
    phoneNumber,
    profilePicture,
    aboutMe
  );
  res.status(201).json(newHost);
});

router.get(
  "/:id",
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const host = await getHostById(id);

      res.status(200).json(host);
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
