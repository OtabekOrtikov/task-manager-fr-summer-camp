import { TaskListView } from './task-list.view';
import { TaskListModel } from './task-list.model';
import { TaskController } from '../task/task.controller';
import { eventBus } from '../../../utils/event-bus';
import {TaskManagerService} from "../../services/task-manager.service";

export class TaskListController {
  view = new TaskListView();
  model = new TaskListModel();
  taskManager = new TaskManagerService()
  taskControllers = {};
  tasks = [];
  currentMaxId = 0;

  constructor() {
    eventBus.subscribe('render-table', () => {

      this.view.render();

      this.model.getTasks().then(tasks => {
        this.tasks = tasks;
        this.tasks.forEach(task => {
          this.taskControllers[task.id] = new TaskController(task);
          if (task.id > this.currentMaxId) {
            this.currentMaxId = task.id;
          }
        });
      });
    });

    
    // CREATE TASK
    eventBus.subscribe('create-task-table', task => {
      this.taskManager.createTask(task)
          .then(res => {
            if (res?.status === 200) {
              res.json().then(body => {
                new TaskController(body);
              })
            }
          })
    });


    // DELETE TASK
    eventBus.subscribe('delete-task', taskId => {

      const taskIndex = this.tasks.findIndex(task => task.id === taskId);

      if (taskIndex !== -1) {
        this.tasks.splice(taskIndex, 1);

        if (this.taskControllers[taskId]) {
          this.taskControllers[taskId].removeView();
          delete this.taskControllers[taskId];
        }

      } else {
        console.error(`Task with id ${taskId} not found.`);
      }

    });
  }
}
