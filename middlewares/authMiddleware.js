import jwt from "jsonwebtoken";
// Ensure this matches the secret used in authController.js
const authenticateToken = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ message: "Access denied, no token provided" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      next();
      res.json({ message: "Welcome to the protected route", user: decoded });
    } catch (err) {
      res.status(401).json({ message: "Invalid or expired token" });
    }
  } catch (error) {
    console.error("Error Caught: " + error.message);
    return res
      .status(500)
      .json({ error: `Internal Server Error ${error.message}` });
  }
};

export default authenticateToken;