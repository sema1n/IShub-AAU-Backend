let tasks = [
  { id: '1', title: 'Learn Node.js', completed: false },
  { id: '2', title: 'Build an API', completed: false }
];

exports.getTasks = () => tasks;

exports.addTask = (task) => {
  const newTask = { id: String(Date.now()), ...task };
  tasks.push(newTask);
  return newTask;
};

exports.getTaskById = (id) => tasks.find(task => task.id === id);

exports.updateTask = (id, updatedTask) => {
  const index = tasks.findIndex(task => task.id === id);
  if (index !== -1) {
    tasks[index] = { ...tasks[index], ...updatedTask };
    return tasks[index];
  }
  return null;
};

exports.deleteTask = (id) => {
  const index = tasks.findIndex(task => task.id === id);
  if (index !== -1) {
    tasks.splice(index, 1);
    return true;
  }
  return false;
};
