import mongoose from "mongoose";
import { ERROR_MESSAGES } from "../constant/errorMessages.js";
import * as dotenv from "dotenv";
dotenv.config();

const dbUrl = process.env.DB_URL;

if (!dbUrl) {
  console.error(ERROR_MESSAGES.DATABASE.DB_URL_NOTFOUND);
  process.exit(1);
}


export const dbConnection = () => {
  mongoose.connect(dbUrl)
    .then(() => {
      console.log(ERROR_MESSAGES.DATABASE.DB_SUCCESS);
    })
    .catch((error) => {
      console.error(ERROR_MESSAGES.DATABASE.DB_FAIL, error);
      // const fallBackUrl = "mongodb://localhost:27017/kkmed";
      // mongoose.connect(fallBackUrl).then(() => {
      //   console.log(ERROR_MESSAGES.DATABASE.DB_SUCCESS + "to local");
      // })
    })
}