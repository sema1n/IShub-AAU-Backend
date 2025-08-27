const userService = require("../data/user_service");
const taskService = require("../data/task_service");

// User registration
async function register(req, res, next) {
  try {
    const { username, password } = req.body;
    const user = await userService.registerUser(username, password);
    res.status(201).json({ id: user._id, username: user.username, role: user.role });
  } catch (err) {
    next(err);
  }
}

// User login
async function login(req, res, next) {
  try {
    const { username, password } = req.body;
    const token = await userService.loginUser(username, password);
    res.json({ token });
  } catch (err) {
    next(err);
  }
}

// Promote user (admin only)
async function promote(req, res, next) {
  try {
    const userId = req.params.id;
    const user = await userService.promoteUser(userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: `${user.username} promoted to admin` });
  } catch (err) {
    next(err);
  }
}

// Task endpoints
async function createTask(req, res, next) {
  try {
    const task = await taskService.createTask(req.body);
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
}

async function getAllTasks(req, res, next) {
  try {
    const tasks = await taskService.getAllTasks();
    res.json(tasks);
  } catch (err) {
    next(err);
  }
}

async function getTaskById(req, res, next) {
  try {
    const task = await taskService.getTaskById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (err) {
    next(err);
  }
}

async function updateTask(req, res, next) {
  try {
    const task = await taskService.updateTask(req.params.id, req.body);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (err) {
    next(err);
  }
}

async function deleteTask(req, res, next) {
  try {
    const task = await taskService.deleteTask(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Task deleted" });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  register,
  login,
  promote,
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask
};
