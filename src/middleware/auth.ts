const jwt = require('jsonwebtoken');
import express from "express";

module.exports = (req:express.Request, res:express.Response, next:express.NextFunction) => {
  const authHeader = req.header('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id: user._id, role: user.role }
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token is not valid' });
  }
};
