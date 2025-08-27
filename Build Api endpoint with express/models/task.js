class Task {
  constructor(id, title, description, dueDate, status) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.status = status;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}

module.exports = Task;
