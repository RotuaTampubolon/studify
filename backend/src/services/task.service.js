const prisma = require('../config/database');

const getAllTasks = async (userId, query) => {
  const { status, priority } = query;

  const filters = { userId };
  if (status) filters.status = status;
  if (priority) filters.priority = priority;

  return await prisma.task.findMany({
    where: filters,
    orderBy: { createdAt: 'desc' },
  });
};

const getTaskById = async (id, userId) => {
  const task = await prisma.task.findUnique({ where: { id } });

  if (!task) {
    const error = new Error('Task not found');
    error.statusCode = 404;
    throw error;
  }

  if (task.userId !== userId) {
    const error = new Error('Not authorized');
    error.statusCode = 403;
    throw error;
  }

  return task;
};

const createTask = async (userId, body) => {
  const { title, description, priority, dueDate } = body;

  return await prisma.task.create({
    data: {
      title,
      description,
      priority,
      dueDate: dueDate ? new Date(dueDate) : null,
      userId,
    },
  });
};

const updateTask = async (id, userId, body) => {
  await getTaskById(id, userId);

  return await prisma.task.update({
    where: { id },
    data: body,
  });
};

const deleteTask = async (id, userId) => {
  await getTaskById(id, userId);
  await prisma.task.delete({ where: { id } });
};

module.exports = { getAllTasks, getTaskById, createTask, updateTask, deleteTask };