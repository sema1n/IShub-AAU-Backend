const taskService = require("../data/taskService");

// Create Task
async function createTask(req, res, next) {
  try {
    const task = await taskService.createTask(req.body);
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
}

// Get All Tasks
async function getAllTasks(req, res, next) {
  try {
    const tasks = await taskService.getAllTasks();
    res.json(tasks);
  } catch (err) {
    next(err);
  }
}

// Get Task by ID
async function getTaskById(req, res, next) {
  try {
    const task = await taskService.getTaskById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (err) {
    next(err);
  }
}

// Update Task
async function updateTask(req, res, next) {
  try {
    const updated = await taskService.updateTask(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: "Task not found" });
    res.json(updated);
  } catch (err) {
    next(err);
  }
}

// Delete Task
async function deleteTask(req, res, next) {
  try {
    const deleted = await taskService.deleteTask(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    next(err);
  }
}

module.exports = { createTask, getAllTasks, getTaskById, updateTask, deleteTask };
