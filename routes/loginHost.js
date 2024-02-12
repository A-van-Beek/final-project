import { Router } from "express";
import jwt from "jsonwebtoken";
import getHosts from "../services/hosts/getHosts.js";

const router = Router();
const secretKey = process.env.AUTH_SECRET_KEY || "my-secret-key";
// login hosts
router.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Controleer op lege invoer
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username en password zijn verplicht !" });
    }

    // Dynamische import voor userData
    const hosts = await getHosts();

    //// Controleren of de import gelukt is. Dit werkt...
    // console.log("Users from import:", users);

    const host = hosts.find(
      (h) => h.username === username && h.password === password
    );

    if (!host) {
      return res
        .status(401)
        .json({ message: "Invalid credentials van de host !" });
    }

    const token = generateToken(host.id);
    res.status(200).json({ message: "Host is succesvol ingelogd !", token });
  } catch (error) {
    console.error("Fout tijdens login:", error);
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
