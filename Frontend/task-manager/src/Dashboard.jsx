import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "./api";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await API.get("/tasks");
    setTasks(res.data);
    localStorage.setItem("Task added", JSON.stringify(res.data));
  };

  const addTask = async () => {
  try {
    if (!title.trim()) {
      alert("Please enter the task title");
      return;
    }

    await API.post("/tasks", { title });
    setTitle("");
    fetchTasks();

  } catch (error) {
    alert("Failed to add task");
  }
};


  const deleteTask = async (id) => {
    await API.delete(`/tasks/${id}`);
    fetchTasks();
  };

  const logout = () => {
  const confirmLogout = window.confirm("Are you sure you want to logout?");

  if (!confirmLogout) return;

  localStorage.removeItem("token");
  navigate("/login");
};


  return (
    <div className="min-h-screen bg-linear-to-r from-indigo-500 to-purple-600 p-10">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-2xl">

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-purple-700">
            Task Dashboard
          </h2>

          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        <div className="flex gap-3 mb-6">
          <input
            className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-purple-400"
            placeholder="Enter task..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <button
            onClick={addTask}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700"
          >
            Add
          </button>
        </div>

        <div className="space-y-3">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow"
            >
              <span>{task.title}</span>

              <button
                onClick={() => deleteTask(task._id)}
                className="bg-red-400 text-white px-3 py-1 rounded hover:bg-red-500"
              >
                Delete
              </button>
            </div>
          ))}
        </div>

        <div className="mt-4 text-right text-gray-600">
          Total Tasks: {tasks.length}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;