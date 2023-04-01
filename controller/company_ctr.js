import pool from "../config/db_config.js";

// POST COMPANY
const createCompany = async (req, res) => {
  try {
    const { title, email, address } = req.body;

    let titleValues =
      title.trim() === "" ? res.send({ msg: "title kiriting?" }) : title.trim();

    let addressValues =
      address.trim() === ""
        ? res.send({ msg: "address kiriting?" })
        : address.trim();

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

    let companyEmailId = emailId.rows[0].id;

    await pool.query(
      `INSERT INTO company(title, email_id, address) VALUES($1,$2,$3)`,
      [titleValues, companyEmailId, addressValues]
    );

    return res.status(201).send({ msg: "Created company!" });
  } catch {
    res.send({ msg: "Error" });
  }
};

// // DELETE USER
const deleteCompany = async (req, res) => {
  const { id } = req.params;

  let getCompany = await pool.query("select * from company where id = $1", [
    id,
  ]);

  if (!getCompany.rows[0])
    return res.status(404).send({ msg: "Company not found!" });

  let companyEmailId = getCompany.rows[0].email_id;

  await pool.query(`delete from company where id = $1`, [id]);

  let companyEmail = await pool.query(`select * from emails where id = $1`, [
    companyEmailId,
  ]);

  let emailId = companyEmail.rows[0].id;

  await pool.query(`delete from emails where id = $1`, [emailId]);

  res.status(201).send({ msg: "Deleted company!" });
};

// GET COMPANYS
const getCompanys = async (req, res) => {
  try {
    let companyList = await pool.query("select * from company");
    res.status(201).send(companyList.rows);
  } catch {
    res.send({ msg: "Error" });
  }
};

// //GET COMPANY
const getCompany = async (req, res) => {
  const { id } = req.params;

  let getOne = await pool.query("select * from company where id = $1", [id]);

  if (!getOne.rows[0])
    return res.status(404).send({ msg: "Company not found!" });

  res.status(201).send(getOne.rows);
};

// // UPDATE COMPANY
const updateCompany = async (req, res) => {
  let { id, title, email, address } = req.body;

  let getOne = await pool.query("select * from company where id = $1", [id]);

  let companyEmailId = getOne.rows[0].email_id;

  let userEmail = await pool.query("select * from emails where id = $1", [
    companyEmailId,
  ]);

  if (!getOne.rows[0])
    return res.status(404).send({ msg: "Company not found!" });

  title = title ? title : getOne.rows[0].title;
  email = email ? email : userEmail.rows[0].title;
  address = address ? address : getOne.rows[0].address;

  await pool.query(
    `update company set title = $1, address = $2 where id = $3
    `,
    [title, address, id]
  );

  await pool.query(
    `update emails set title = $1 where id = $2
    `,
    [email, companyEmailId]
  );

  res.status(201).send({ msg: "Updated company!" });
};

export { getCompanys, getCompany, createCompany, deleteCompany, updateCompany };
