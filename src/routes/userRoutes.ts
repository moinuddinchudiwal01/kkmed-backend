import express from "express";
import { updateUserDetails, getUserProfile } from "../controller/user.controller.js";
const router = express.Router();
import { auth } from '../middleware/auth.js';

router.get('/profile', auth as any, getUserProfile as any);
router.put('/update', auth as any, updateUserDetails as any);

export default router;