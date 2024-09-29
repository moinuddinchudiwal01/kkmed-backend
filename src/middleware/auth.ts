import jwt from 'jsonwebtoken';
import express from 'express';
import dotenv from 'dotenv';
import { User } from '../types/userTypes.js';

dotenv.config();

export const auth = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const authHeader = req.header('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || '') as User;
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token is not valid' });
  }
};
