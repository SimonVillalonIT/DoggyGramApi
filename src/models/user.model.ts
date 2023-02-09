import db from "../config/db"

export const userRegister = async (name: string, email: string, password: string) => {
    const date = new Date();
    const currentDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`

    try {
        const savedUser = await db.query(`INSERT INTO users (name, email, password, date) VALUES ("${name}", "${email}", "${password}","${currentDate}");`)
        return savedUser
    } catch (error) {
        throw error
    }
}

export const userLogin = async (user: string) => {
    try {
        const query = await db.query(`SELECT * FROM users WHERE name = "${user}" OR email = "${user}" `)
        return query
    } catch (error) {
        throw new Error(error)
    }
}

export const userAddAvatar = async (name: string, public_id: string, secure_url: string) => {
    try {
        const query = await db.query(`UPDATE users SET avatar = "${secure_url}", public_id = "${public_id}" WHERE name = "${name}"`)
    } catch (error) {
        throw new Error(error)
    }
}
