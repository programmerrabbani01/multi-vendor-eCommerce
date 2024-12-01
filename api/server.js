import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { errorHandler } from "./middlewares/errorHandler.js";
import authRoute from "./route/authRoute.js";
import bodyParser from "body-parser";

// set environment variables

dotenv.config();
const PORT = process.env.PORT || 4040;

// express initialization

const app = express();

// middleware

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "http://localhost:3001",
    // origin: "https://wolmart-project-dagg.vercel.app",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(morgan("dev"));
app.use(bodyParser.json());

// static folder

app.use(express.static("public"));

// routing

app.use("/api/v1/auth", authRoute);

// error handler

app.use(errorHandler);

// app listener

app.listen(PORT, () => {
  //   mongoDBConnection();
  console.log(`Server Is Running on port ${PORT}`.bgGreen.black);
});
