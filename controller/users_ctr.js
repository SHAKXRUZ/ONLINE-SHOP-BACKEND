import pool from "../config/db_config.js";

// GET USERS
const getUsers = async (req, res) => {
  try {
    let user_list = await pool.query(`select * from users`);
    res.send(user_list.rows);
  } catch {
    res.send({ msg: "Error" });
  }
};

// CREATE USER
const createUser = async (req, res) => {
  const { name, age, email_id, password, role, company_id } = req.body;
  let foundedUser = await pool.query(
    "select * from users where email_id = $1",
    [email_id]
  );
  if (!foundedUser.rows[0]) {
    await pool.query(
      `INSERT INTO users(name, age, email_id, password, role, company_id) VALUES($1,$2,$3,$4,$5,$6)`,
      [name, age, email_id, password, role, company_id]
    );
    return res.send({ mag: "Created users!" });
  }
  res.send({ msg: "This user exists!" });
};

// UPDATE USER
const updateUser = async (req, res) => {
  let { id, name, age, email_id, password, role, company_id } = req.body;
  let getOne = await pool.query("select * from users where id = $1", [id]);
  if (!getOne.rows[0]) return res.send({ msg: "User not found!" });
  name = name ? name : getOne.rows[0].name;
  age = age ? age : getOne.rows[0].age;
  email_id = email_id ? email_id : getOne.rows[0].email_id;
  password = password ? password : getOne.rows[0].password;
  role = role ? role : getOne.rows[0].role;
  company_id = company_id ? company_id : getOne.rows[0].company_id;
  await pool.query(
    `update users set name = $1, age = $2, email_id = $3, password = $4, role = $5, company_id = $6 where id = $7`,
    [name, age, email_id, password, role, company_id, id]
  );
  res.send({ msg: "Updated user!" });
};

// DELETE USER
const deleteUser = async (req, res) => {
  const { id } = req.body;
  let getOne = await pool.query("select * from users where id = $1", [id]);
  if (!getOne.rows[0]) return res.send({ msg: "User not found!" });
  let deletedUser = await pool.query(`delete from users where id = $1`, [id]);
  res.send({ msg: "Deleted user!" });
};

//GET USER
const getUser = async (req, res) => {
  const { id } = req.body;

  let getOne = await pool.query("select * from users where id = $1", [id]);

  if (!getOne.rows[0]) return res.send({ msg: "User not found!" });

  res.send(getOne.rows);
};

export { getUsers, createUser, updateUser, deleteUser, getUser };
