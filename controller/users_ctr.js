import pool from "../config/db_config.js";

// GET USERS
const getUsers = async (req, res) => {
  try {
    let userList = await pool.query("select * from users");
    res.status(201).send(userList.rows);
  } catch {
    res.send({ msg: "Error" });
  }
};

// // UPDATE USER
const updateUser = async (req, res) => {
  let { id, name, email, password, age, role } = req.body;

  let getOne = await pool.query("select * from users where id = $1", [id]);

  let userEmailId = getOne.rows[0].email_id;

  let userEmail = await pool.query("select * from emails where id = $1", [
    userEmailId,
  ]);

  if (!getOne.rows[0]) return res.status(404).send({ msg: "User not found!" });

  name = name ? name : getOne.rows[0].name;
  password = password ? password : getOne.rows[0].password;
  age = age ? age : getOne.rows[0].age;
  email = email ? email : userEmail.rows[0].title;
  role = role ? role : getOne.rows[0].role;

  await pool.query(
    `update users set name = $1, password = $2, age = $3, role = $4 where id = $5
    `,
    [name, password, age, role, id]
  );

  await pool.query(
    `update emails set title = $1 where id = $2
    `,
    [email, userEmailId]
  );

  res.status(201).send({ msg: "Updated user!" });
};

// // DELETE USER
const deleteUser = async (req, res) => {
  const { id } = req.params;

  let getUser = await pool.query("select * from users where id = $1", [id]);

  if (!getUser.rows[0]) return res.status(404).send({ msg: "User not found!" });

  let userEmailId = getUser.rows[0].email_id;

  await pool.query(`delete from users where id = $1`, [id]);

  let userEmail = await pool.query(`select * from emails where id = $1`, [
    userEmailId,
  ]);

  let emailId = userEmail.rows[0].id;

  await pool.query(`delete from emails where id = $1`, [emailId]);

  res.status(201).send({ msg: "Deleted user!" });
};

// //GET USER
const getUser = async (req, res) => {
  const { id } = req.params;

  let getOne = await pool.query("select * from users where id = $1", [id]);

  if (!getOne.rows[0]) return res.status(404).send({ msg: "User not found!" });

  res.status(201).send(getOne.rows);
};

export { getUsers, updateUser, deleteUser, getUser };
