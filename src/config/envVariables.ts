require("dotenv").config();

export const dbVariables = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
};

export const cloudinaryVariables = {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  upload_folder: process.env.CLOUDINARY_UPLOAD_FOLDER,
};

export const jwtVariables = {
  secret: process.env.JWT_SECRET,
  refresh: process.env.JWT_REFRESH,
};

export const googleAuth = {
  client_id: process.env.GOOGLE_CLIENT_ID,
  client_secret: process.env.GOOGLE_CLIENT_SECRET,
};
