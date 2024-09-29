import express from "express";
import { User } from "./types/userTypes.ts";
declare global {
    namespace Express {
        interface Request {
            user?: User
        }
    }
}
