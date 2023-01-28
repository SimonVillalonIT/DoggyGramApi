import axios from "axios";
import express from "express";
const fileupload = require("express-fileupload");

const app = express();

app.use(express.json());
app.use(fileupload());

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.post("/isADog?", async (req: any, res) => {
  console.log(req.files);
  res.status(200);
  res.json({ok: true});
});

app.listen(3000, () => {
  console.log("listening on http://localhost:3000");
});
