import jwt from 'jsonwebtoken';

/**
 * Feature 6: Authorization Implementation (JWT tabanlı) 
 */
export const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: "Erişim için token gereklidir." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret_key_2025');
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Geçersiz veya süresi dolmuş token." });
  }
};