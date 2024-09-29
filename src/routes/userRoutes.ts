import express from "express";
import { updateUserDetails, getUserProfile } from "../controller/user.controller";
const router = express.Router();
const auth = require('../middleware/auth');

router.get('/profile', auth, getUserProfile as any);
router.put('/update', auth, updateUserDetails as any);

export default  router;