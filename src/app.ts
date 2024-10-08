import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { dbConnection } from "./database/dbConfig.js";
import indexRouter from "./routes/inex.js";
import authRouter from "./routes/authRoutes.js";

// .env file configration
dotenv.config({ path: "./.env" });

// initialize app
export const app = express();

app.use(express.json());
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  methods: "GET,POST,PUT,PATCh,DELETE",
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}))
app.use(express.urlencoded({ extended: true }))

// import routes
app.use("/api/v1", indexRouter)
app.use("/auth", authRouter)

// import database
dbConnection();

// server configration
app.listen(process.env.PORT, () => {
  console.log(`Server is running on localhost:${process.env.PORT}`);
})