import express from "express";
import fileupload from "express-fileupload";
import cors from "cors";
import morgan from "morgan";
import authRouter from "./routes/auth";
import cookieParser from "cookie-parser";

const app = express();

const whiteList = [process.env.ORIGIN1, process.env.ORIGIN2];

app.use(
  cors({
    origin: (origin, callback) => {
      console.log("CORS origin: ", origin);
      if (!origin || whiteList.includes(origin)) {
        return callback(null, origin);
      }
      const error = new Error(`CORS origin forbidden: ${origin}`);
      return callback(error);
    },
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  fileupload({
    tempFileDir: "uploads",
    useTempFiles: true,
  })
);

app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.status(200);
  res.json({ status: "OK", message: "Hello world!😁" });
});

app.use("/api/user", authRouter);

const PORT = process.env.PORT || 8080;

app.listen(8080, () => {
  console.log("listening on port:" + PORT + "🚀");
});
