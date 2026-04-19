try {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await prisma.user.findUnique({
    where: { id: decoded.userId },
    select: { id: true, name: true, email: true },
  });

  // ✅ Tambahkan pengecekan ini
  if (!req.user) {
    return sendError(res, 'Not authorized, user no longer exists', 401);
  }

  next();
} catch {
  return sendError(res, 'Not authorized, invalid token', 401);
} 