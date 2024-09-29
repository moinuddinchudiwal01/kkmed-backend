import express from "express";
import userRoute from "./userRoutes";
const indexRouter = express.Router();

indexRouter.use("/user",userRoute);
export default indexRouter;