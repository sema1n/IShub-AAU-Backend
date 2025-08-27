const Task = require("../models/task");

// Create a new task
async function createTask(taskData) {
  const task = new Task(taskData);
  return task.save();
}

// Retrieve all tasks
async function getAllTasks() {
  return Task.find();
}

// Retrieve task by ID
async function getTaskById(id) {
  return Task.findById(id);
}

// Update task by ID
async function updateTask(id, updateData) {
  return Task.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
}

// Delete task by ID
async function deleteTask(id) {
  return Task.findByIdAndDelete(id);
}

module.exports = { createTask, getAllTasks, getTaskById, updateTask, deleteTask };
