import pool from "../config/db_config.js";

const registrUser = async (req, res) => {
  try {
    const { name, age, email, password } = req.body;

    let nameValues =
      name.trim() === "" ? res.send({ msg: "name kiriting?" }) : name.trim();

    let userEmail = await pool.query("select * from emails where title = $1", [
      email,
    ]);

    if (userEmail.rows[0]) {
      return res.status(401).send({
        msg: "Bu email ro'yxatdan o'tgan!",
      });
    }

    await pool.query(`INSERT INTO emails(title) VALUES($1)`, [email]);

    const emailId = await pool.query(`select * from emails where title = $1`, [
      email,
    ]);

    await pool.query(
      `INSERT INTO users(name, age, email_id, password) VALUES($1,$2,$3,$4)`,
      [nameValues, age, emailId.rows[0].id, password]
    );

    return res.send({ msg: "Created users!" });
  } catch {
    res.send({ msg: "Error" });
  }
};

export { registrUser };
