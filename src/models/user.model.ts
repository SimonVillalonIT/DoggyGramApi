import db from "../config/db";

export const userRegister = async (
  name: string,
  email: string,
  password: string
) => {
  const date = new Date();
  const currentDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

  const savedUser = await db.query(
    `INSERT INTO users (name, email, password, date) VALUES ("${name}", "${email}", "${password}","${currentDate}");`
  );
  return savedUser;
};

export const userLogin = async (user: string) => {
  const query = await db.query(
    `SELECT * FROM users WHERE name = "${user}" OR email = "${user}" `
  );
  return query;
};

export const userAddAvatar = async (
  id: number,
  public_id: string,
  secure_url: string
) => {
  return await db.query(
    `UPDATE users SET avatar = "${secure_url}", public_id = "${public_id}" WHERE id = ${id}`
  );
};

export const checkUser = async (name: string) => {
  try {
    const id = await db.query(`SELECT id FROM users WHERE name = "${name}"`);
    return { status: true, id: id[0][0].id };
  } catch (error) {
    return { status: false, id: null };
  }
};

export const userInfo = async (id: number | string) => {
  const query = await db.query(
    `SELECT id,name,email,public_id,avatar,date FROM users WHERE id = "${id}"`
  );
  return query;
};
