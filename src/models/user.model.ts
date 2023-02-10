import db from "../config/db"

export const userRegister = async (res, name: string, email: string, password: string) => {
    const date = new Date();
    const currentDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`

    const savedUser = await db.query(`INSERT INTO users (name, email, password, date) VALUES ("${name}", "${email}", "${password}","${currentDate}");`)
    return savedUser
}

export const userLogin = async (res, user: string) => {
    const query = await db.query(`SELECT * FROM users WHERE name = "${user}" OR email = "${user}" `)
    return query
}

export const userAddAvatar = async (res, name: string, public_id: string, secure_url: string) => {
    await db.query(`UPDATE users SET avatar = "${secure_url}", public_id = "${public_id}" WHERE name = "${name}"`)
}

export const userInfo = async (id) => {
    const query = await db.query(`SELECT id,name,email,public_id,avatar,date FROM users WHERE id = "${id}"`)
    return query
}