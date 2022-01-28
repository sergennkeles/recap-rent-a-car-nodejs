const httpStatus = require("http-status");
const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];  
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(httpStatus.UNAUTHORIZED).send({ error: "Bu işlemi yapmak için giriş yapmanız gerekmektedir." });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(httpStatus.FORBIDDEN).send({ error: err });
    }
    req.user = user;
    next();
  });
};

module.exports=authenticateToken