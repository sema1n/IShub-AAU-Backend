const taskService = require('../data/taskService');

exports.getAllTasks = (req, res) => {
  const tasks = taskService.getTasks();
  res.json(tasks);
};

exports.createTask = (req, res) => {
  const newTask = taskService.addTask(req.body);
  res.status(201).json(newTask);
};

exports.getTaskById = (req, res) => {
  const task = taskService.getTaskById(req.params.id);
  if (task) {
    res.json(task);
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
};

exports.updateTask = (req, res) => {
  const updatedTask = taskService.updateTask(req.params.id, req.body);
  if (updatedTask) {
    res.json(updatedTask);
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
};

exports.deleteTask = (req, res) => {
  const deleted = taskService.deleteTask(req.params.id);
  if (deleted) {
    res.json({ message: 'Task deleted successfully' });
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
};
