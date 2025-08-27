const Task = require("../models/task");

async function createTask(taskData) {
  const task = new Task(taskData);
  return task.save();
}

async function getAllTasks() {
  return Task.find();
}

async function getTaskById(id) {
  return Task.findById(id);
}

async function updateTask(id, data) {
  return Task.findByIdAndUpdate(id, data, { new: true, runValidators: true });
}

async function deleteTask(id) {
  return Task.findByIdAndDelete(id);
}

module.exports = { createTask, getAllTasks, getTaskById, updateTask, deleteTask };
