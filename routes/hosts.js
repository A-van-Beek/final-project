import express from "express";

import getHosts from "../services/hosts/getHosts.js";
import getHostById from "../services/hosts/getHostById.js";
import createHost from "../services/hosts/createHost.js";
import updateHostById from "../services/hosts/updateHostById.js";
import deleteHostById from "../services/hosts/deleteHostById.js";

import authMiddleware from "../middleware/auth.js";
import notFoundErrorHandler from "../middleware/notFoundErrorHandler.js";
import noResultErrorHandler from "../middleware/noResultErrorHandler.js";
import NotFoundError from "../errors/NotFoundError.js";
import NoResultError from "../errors/NoResultError.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const { username, name, email, phoneNumber, profilePicture, aboutMe } =
      req.query;
    const hosts = await getHosts(
      username,
      name,
      email,
      phoneNumber,
      profilePicture,
      aboutMe
    );
    if (hosts.length === 0) {
      throw new NoResultError("Hosts:");
    }
    res.status(200).json(hosts);
  } catch (error) {
    next(error);
  }
  // noResultErrorHandler;
});

router.post("/", authMiddleware, async (req, res, next) => {
  try {
    const {
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
      aboutMe,
    } = req.body;
    const newHost = await createHost(
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
      aboutMe
    );
    res.status(201).json(newHost);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/:id",
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const host = await getHostById(id);

      if (!host) {
        res.status(404).json({ message: `Host met id ${id} is niet bekend` });
      } else {
        res.status(200).json(host);
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
      const {
        username,
        password,
        name,
        email,
        phoneNumber,
        profilePicture,
        aboutMe,
      } = req.body;
      const updatedHost = await updateHostById(
        id,
        username,
        password,
        name,
        email,
        phoneNumber,
        profilePicture,
        aboutMe
      );
      res.status(200).json(updatedHost);
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
      const deletedHostId = await deleteHostById(id);

      res.status(200).json({
        message: `Host met id ${deletedHostId} is verwijderd !`,
      });
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler
);

export default router;
