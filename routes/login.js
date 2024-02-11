import { Router } from "express";
import jwt from "jsonwebtoken";
import getUsers from "../services/users/getUsers.js";

const router = Router();
const secretKey = process.env.AUTH_SECRET_KEY || "my-secret-key";

router.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Controleer op lege invoer
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password zijn verplicht !" });
    }

    // Dynamische import voor userData
    const users = await getUsers();

    //// Controleren of de import gelukt is. Dit werkt...
    // console.log("Users from import:", users);

    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials!" });
    }

    const token = generateToken(user.id);
    res.status(200).json({ message: "Successfully logged in!", token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Token-generate functie
const generateToken = (userId) => {
  const payload = { userId };
  const token = jwt.sign(payload, secretKey, { expiresIn: "1h" }); // Instelbare vervaltijd

  return token;
};

export default router;
