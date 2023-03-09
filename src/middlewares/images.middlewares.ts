import axios from "axios";
import fs from "fs/promises";

export const imageCheck = async (request, response, next) => {
  if (!request.files) {
    next();
  }
  const file = await fs.readFile(request.files.image.tempFilePath);
  const blob = new Blob([file], { type: request.files.image.mimetype });
  const form = new FormData();
  form.append("image", blob);
  try {
    const { data } = await axios.post("http://localhost:8000/detect", form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (data.Result === "notadog") {
      throw "The image is not a dog";
    }
    next();
  } catch (error) {
    response.status(400).json({ error: error });
  }
};
