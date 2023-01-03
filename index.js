import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import userRoutes from "./src/routes/user.routes.js";
import authRoutes from "./src/routes/auth.routes.js";
import { mongoConnect } from "./src/storage/db/mongo.connect.js";
import cookieParser from "cookie-parser";

// crear instancia de express
const app = express();
// configurar express
dotenv.config();
const port = 5000;

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "*",
  })
);
/* app.use(
  cors({
    credentials: true,
    origin: "https://falso-netflix.vercel.app",
  })
); */

mongoConnect();

// rutas
app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.get("/ping", (req, res)=>{
  console.log("someone has pinged");
  res.send("pong");
})
app.listen(port, () =>
  console.log("> Server is up and running on port : " + port)
);
