import { checkUser, userRegister } from "../models/user.model";
interface User {
  name: string;
  email: string;
  password: string;
  avatar: string;
}

export const FindOrCreate = async (user: User) => {
  try {
    const { status, id } = await checkUser(user.name);
    if (status) {
      return id;
    } else {
      const result = await userRegister(user.name, user.email, user.password);
      return result.insertedId;
    }
  } catch (error) {
    console.log(error);
    console.log(user);
  }
};
