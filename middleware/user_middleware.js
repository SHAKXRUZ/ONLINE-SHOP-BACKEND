import jwt from "jsonwebtoken";
module.exports = async function (req, res, next) {
  if (req.url === "/users/create") {
    return next();
  }
  try {
    const { token } = req.headers;
    const tokens = await jwt.verify(token, process.env.SECRET_KEY);
    req.user_id = tokens.id;
    next();
  } catch (error) {
    res.status(401).send({
      msg: "Token mavjud emas!",
    });
  }
};
