const updateTask = async (id, userId, body) => {
  await getTaskById(id, userId);

  // ✅ Whitelist field yang boleh diupdate
  const { title, description, status, priority, dueDate } = body;

  return await prisma.task.update({
    where: { id },
    data: {
      ...(title && { title }),
      ...(description !== undefined && { description }),
      ...(status && { status }),
      ...(priority && { priority }),
      ...(dueDate !== undefined && { dueDate: dueDate ? new Date(dueDate) : null }),
    },
  });
}; 