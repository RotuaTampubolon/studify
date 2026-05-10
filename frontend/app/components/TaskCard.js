export default function TaskCard({ task, onDelete, onStatusChange }) {
  const priorityColor = {
    LOW: "bg-green-100 text-green-700",
    MEDIUM: "bg-yellow-100 text-yellow-700",
    HIGH: "bg-red-100 text-red-700",
  };

  const statusColor = {
    TODO: "bg-gray-100 text-gray-600",
    IN_PROGRESS: "bg-blue-100 text-blue-600",
    DONE: "bg-green-100 text-green-600",
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold text-gray-800">{task.title}</h3>
        <span
          className={`text-xs px-2 py-1 rounded-full font-medium ${priorityColor[task.priority]}`}
        >
          {task.priority}
        </span>
      </div>

      {task.description && (
        <p className="text-sm text-gray-500">{task.description}</p>
      )}

      <div className="flex items-center justify-between mt-1">
        <select
          value={task.status}
          onChange={(e) => onStatusChange(task.id, e.target.value)}
          className={`text-xs px-2 py-1 rounded-full font-medium border-0 cursor-pointer ${statusColor[task.status]}`}
        >
          <option value="TODO">TODO</option>
          <option value="IN_PROGRESS">IN PROGRESS</option>
          <option value="DONE">DONE</option>
        </select>

        <button
          onClick={() => onDelete(task.id)}
          className="text-xs text-red-400 hover:text-red-600 transition"
        >
          Hapus
        </button>
      </div>

      {task.dueDate && (
        <p className="text-xs text-gray-400">
          Due: {new Date(task.dueDate).toLocaleDateString("id-ID")}
        </p>
      )}
    </div>
  );
}
