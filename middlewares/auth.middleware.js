import { verifyToken } from "../utils/jwt.js";

export const protect = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    
    const token = authHeader.split(' ')[1];

    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    
    req.user = decoded; 
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json({ message: 'Unauthorized' });
  }
};