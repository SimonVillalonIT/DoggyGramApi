import express from "express";
import fileupload from "express-fileupload";
import cors from "cors"
import morgan from "morgan";
import db from "./config/db"
import userController from "./controllers/user.controller";

const app = express();

app.use(express.json());
app.use(fileupload({
  tempFileDir: "uploads",
  useTempFiles: true,
}
));
app.use(cors())
app.use(morgan("dev"))

app.get("/", (req, res) => {
  res.status(200);
  res.json({ status: "OK", message: "Hello world!😁" });
});

app.post("/file", userController)

app.listen(8080, () => {
  console.log("listening on http://localhost:8080");
});
