import db from "../config/db"

export const userRegister = async (name: string, email: string, password: string, avatar: string) => {
    const date = new Date();
    const currentDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`

    try {
        const savedUser = await db.query(`INSERT INTO users (name, email, password, date, avatar) VALUES ("${name}", "${email}", "${password}","${currentDate}" ,"${avatar}");`)
        return savedUser
    } catch (error) {
        throw error
    }

}