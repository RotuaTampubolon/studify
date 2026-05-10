'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '../lib/api';
import TaskCard from '../components/TaskCard';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: '',
    description: '',
    priority: 'MEDIUM',
    dueDate: '',
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }
    fetchData();
  }, []);

  const fetchData = async () => {
    const [meRes, tasksRes] = await Promise.all([api.getMe(), api.getTasks()]);
    if (!meRes.success) {
      router.push('/login');
      return;
    }
    setUser(meRes.data.user);
    setTasks(tasksRes.data?.tasks || []);
    setLoading(false);
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    const res = await api.createTask(form);
    if (res.success) {
      setTasks([res.data.task, ...tasks]);
      setForm({ title: '', description: '', priority: 'MEDIUM', dueDate: '' });
      setShowForm(false);
    }
  };

  const handleDelete = async (id) => {
    const res = await api.deleteTask(id);
    if (res.success) {
      setTasks(tasks.filter((t) => t.id !== id));
    }
  };

  const handleStatusChange = async (id, status) => {
    const res = await api.updateTask(id, { status });
    if (res.success) {
      setTasks(tasks.map((t) => (t.id === id ? res.data.task : t)));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-400">Loading...</p>
      </div>
    );
  }

  const todo = tasks.filter((t) => t.status === 'TODO');
  const inProgress = tasks.filter((t) => t.status === 'IN_PROGRESS');
  const done = tasks.filter((t) => t.status === 'DONE');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-indigo-600">Studify</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">Halo, {user?.name} 👋</span>
          <button
            onClick={handleLogout}
            className="text-sm text-red-400 hover:text-red-600 transition"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">My Tasks</h2>
            <p className="text-gray-500 text-sm mt-1">{tasks.length} task total</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-indigo-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-indigo-700 transition"
          >
            {showForm ? 'Batal' : '+ Tambah Task'}
          </button>
        </div>

        {/* Form tambah task */}
        {showForm && (
          <form
            onSubmit={handleCreateTask}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8 flex flex-col gap-4"
          >
            <h3 className="font-semibold text-gray-700">Task Baru</h3>
            <input
              type="text"
              placeholder="Judul task"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <input
              type="text"
              placeholder="Deskripsi (opsional)"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <div className="flex gap-4">
              <select
                value={form.priority}
                onChange={(e) => setForm({ ...form, priority: e.target.value })}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
              </select>
              <input
                type="date"
                value={form.dueDate}
                onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            <button
              type="submit"
              className="bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition"
            >
              Simpan Task
            </button>
          </form>
        )}

        {/* Kanban Board */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* TODO */}
          <div>
            <h3 className="font-semibold text-gray-500 text-sm uppercase mb-3">
              Todo ({todo.length})
            </h3>
            <div className="flex flex-col gap-3">
              {todo.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onDelete={handleDelete}
                  onStatusChange={handleStatusChange}
                />
              ))}
              {todo.length === 0 && (
                <p className="text-sm text-gray-400 text-center py-4">Tidak ada task</p>
              )}
            </div>
          </div>

          {/* IN PROGRESS */}
          <div>
            <h3 className="font-semibold text-blue-400 text-sm uppercase mb-3">
              In Progress ({inProgress.length})
            </h3>
            <div className="flex flex-col gap-3">
              {inProgress.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onDelete={handleDelete}
                  onStatusChange={handleStatusChange}
                />
              ))}
              {inProgress.length === 0 && (
                <p className="text-sm text-gray-400 text-center py-4">Tidak ada task</p>
              )}
            </div>
          </div>

          {/* DONE */}
          <div>
            <h3 className="font-semibold text-green-500 text-sm uppercase mb-3">
              Done ({done.length})
            </h3>
            <div className="flex flex-col gap-3">
              {done.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onDelete={handleDelete}
                  onStatusChange={handleStatusChange}
                />
              ))}
              {done.length === 0 && (
                <p className="text-sm text-gray-400 text-center py-4">Tidak ada task</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}   
