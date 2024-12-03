import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { errorHandler } from "./middlewares/errorHandler.js";
import authRoute from "./route/authRoute.js";
import userRoute from "./route/userRoute.js";
import permissionRoute from "./route/permissionRoute.js";
import roleRoute from "./route/roleRoute.js";
import bodyParser from "body-parser";
import path from "path";
import notFound from "./middlewares/notFound.js";

// init express

const app = express();

// middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(morgan("dev"));
app.use(bodyParser.json());

// static folder

app.use(express.static(path.join(path.resolve() + "/public")));

// routes

app.use("/api/v1/user", userRoute);
app.use("/api/v1/permission", permissionRoute);
app.use("/api/v1/role", roleRoute);
app.use("/api/v1/auth", authRoute);

// error handlers

app.use(errorHandler);

// 404 not found handler

app.use(notFound);

// export app

export default app;
