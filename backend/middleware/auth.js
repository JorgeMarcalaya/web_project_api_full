require("dotenv").config();
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = (req, res, next) => {
  const autorization = req.headers.authorization;
  if (!autorization) {
    return res.status(401).send({
      status: false,
      message: "NO AUTORIZADO",
    });
  }
  try {
    const token = autorization.replaceAll("Bearer ", "");
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (e) {
    return res.status(401).send({
      status: false,
      message: "NO AUTORIZADO",
    });
  }
};
