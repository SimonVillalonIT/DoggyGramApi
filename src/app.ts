import express from "express";
import fileupload from "express-fileupload";
import cors from "cors"
import morgan from "morgan";
import authRouter from "./routes/auth"

const app = express();

app.use(express.urlencoded({ extended: false }))
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

app.use('/api/user', authRouter)

const PORT = process.env.PORT || 8080

app.listen(8080, () => {
  console.log("listening on port:" + PORT + "🚀");
});

