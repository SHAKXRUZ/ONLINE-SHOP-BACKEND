import jwt from "jsonwebtoken";
export default async function (req, res, next) {
  if (req.url === "/user/registr" || req.url === "/user/login") {
    return next();
  }
  try {
    const { token } = req.headers;
    const tokens = await jwt.verify(token, process.env.SECRET_KEY);
    req.id = tokens.id;
    next();
  } catch (error) {
    res.status(401).send({
      msg: "Token mavjud emas!",
    });
  }
};

