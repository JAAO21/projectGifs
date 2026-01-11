const jwt = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  const accessToken = req.headers["authorization"] || req.query.accessToken;

  if (!accessToken) {
    return res
      .status(403)
      .json({ message: "Denied Access: No token provided" });
  }

  const [bearer, token] = accessToken.split(" ");

  if (bearer !== "Bearer" || !token) {
    return res
      .status(403)
      .json({ message: "Denied Access: Invalid token format" });
  }

  jwt.verify(token, process.env.JWT_APIKEY, (err, user) => {
    if (err) {
      return res.status(401).json({
        message: "Denied Access: Token expired or incorrect",
        error: err.message,
      });
    }

    req.user = user; // payload del JWT
    next();
  });
};

module.exports = validateToken;
