import express from "express";
import "dotenv/config";
import connectDb from "./config/mongodbConfig";
import router from "./routes/index";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use("/api", router);

const port = process.env.PORT;

connectDb().then(() => {
  app.listen(port, () => {
    console.log("server running on " + port);
  });
});
