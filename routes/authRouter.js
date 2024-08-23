import jwt from "jsonwebtoken";
import { config } from "dotenv";
const loginUsingJWT = (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }
}