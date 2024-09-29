import express from "express";
import userRoute from "./userRoutes.js";
const indexRouter = express.Router();

indexRouter.use("/user", userRoute);
export default indexRouter;