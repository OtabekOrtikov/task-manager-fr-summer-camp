export class TaskModel {
  constructor() {}


  setTaskInfo({
    content,
    createdDate,
    dueDate,
    id,
    priority,
    status,
    title,
    isFavourite = false
  }) {
    this.content = content;
    this.createdDate = new Date(createdDate);
    this.dueDate = new Date(dueDate);
    this.id = id;
    this.priority = priority;
    this.status = status;
    this.title = title;
    this.isFavourite = isFavourite;
  }

  getTaskInfo() {
    return {
      content: this.content,
      createdDate: this.createdDate,
      dueDate: this.dueDate,
      id: this.id,
      priority: this.priority,
      status: this.status,
      title: this.title,
      isFavourite: this.isFavourite
    };
  }

  deleteTaskInfo() {
    this.content = undefined;
    this.createdDate = undefined;
    this.dueDate = undefined;
    this.id = undefined;
    this.priority = undefined;
    this.status = undefined;
    this.title = undefined;
    this.isFavourite = undefined;
  }
}
