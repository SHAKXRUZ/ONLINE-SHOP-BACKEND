import pool from "../config/db_config.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    let userEmail = await pool.query("select * from emails where title = $1", [
      email,
    ]);

    let userPassword = await pool.query(
      "select * from users where password = $1 and email_id= $2",
      [password, userEmail.rows[0].id]
    );

    if (!userEmail.rows[0]) {
      return res.status(404).send({
        msg: "Email error?!",
      });
    }

    if (!userPassword.rows[0]) {
      return res.status(404).send({
        msg: "Password error?!",
      });
    }

    let token = jwt.sign({ id: userEmail.rows[0].id }, process.env.SECRET_KEY, {
      expiresIn: process.env.JWT_TIME,
    });

    return res.send({ mag: "Success!", token });
  } catch {
    res.send({ msg: "Error" });
  }
};

export { loginUser };
