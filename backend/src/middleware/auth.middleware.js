const jwt = require('jsonwebtoken');
const prisma = require('../config/database');
const { sendError } = require('../utils/response');

const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return sendError(res, 'Not authorized, no token', 401);
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, name: true, email: true },
    });
    next();
  } catch {
    return sendError(res, 'Not authorized, invalid token', 401);
  }
};

module.exports = { protect };