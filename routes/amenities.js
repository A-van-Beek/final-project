import express from "express";

import getAmenities from "../services/amenities/getAmenities.js";
import getAmenityById from "../services/amenities/getAmenityById.js";
import createAmenity from "../services/amenities/createAmenity.js";
import updateAmenityById from "../services/amenities/updateAmenityById.js";
import deleteAmenityById from "../services/amenities/deleteAmenityById.js";

import authMiddleware from "../middleware/auth.js";
import notFoundErrorHandler from "../middleware/notFoundErrorHandler.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const {} = req.query;
    const amenities = await getAmenities();
    res.json(amenities);
  } catch (error) {
    next(error);
  }
});

router.post("/", authMiddleware, async (req, res, next) => {
  try {
    const { name } = req.body;
    const newAmenity = await createAmenity(name);
    res.status(201).json(newAmenity);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/:id",
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const amenity = await getAmenityById(id);

      if (!amenity) {
        res
          .status(404)
          .json({ message: `Amenity met id ${id} is niet bekend` });
      } else {
        res.status(200).json(amenity);
      }
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler
);

router.put(
  "/:id",
  authMiddleware,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const updatedAmenity = await updateAmenityById(id, name);
      res.status(200).json(updatedAmenity);
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler
);

router.delete(
  "/:id",
  authMiddleware,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedAmenityId = await deleteAmenityById(id);

      res.status(200).json({
        message: `Amenity met id ${deletedAmenityId} is verwijderd !`,
      });
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler
);

export default router;
