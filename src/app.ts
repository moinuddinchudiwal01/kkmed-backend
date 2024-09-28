import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { dbConnection } from "./database/database";

// .env file configration
dotenv.config({ path: "./.env" });

// initialize app 
export const app = express();

app.use(express.json());
app.use(cors({
  origin:process.env.CLIENT_URL,
  methods:"GET,POST,PUT,PATCh,DELETE",
  credentials:true,
  allowedHeaders: ['Content-Type', 'Authorization']
}))
app.use(express.urlencoded({extended:true}))  

// import routes


// database connection
dbConnection();


// server configration
app.listen(process.env.PORT,()=>{
  console.log(`Server is running on localhost:${process.env.PORT}`);
})