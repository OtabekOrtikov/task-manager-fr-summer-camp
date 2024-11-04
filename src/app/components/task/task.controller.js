import {TaskView} from "./task.view";
import {TaskModel} from "./task.model";
import {TaskManagerService} from "../../services/task-manager.service";
import {eventBus} from "../../../utils/event-bus";

export class TaskController {
  view = new TaskView();
  model = new TaskModel();
  taskManager = new TaskManagerService();

  constructor(task) {
    this.model.setTaskInfo(task);

    this.view.render(this.model.getTaskInfo(), () => {
      eventBus.publish('open-modal', this.model.getTaskInfo());
    });

    eventBus.subscribe(`update-task-${task.id}`, (task) => {
      this.taskManager.updateTask(task).then((res) => {
        if (res?.status === 200) {
          this.model.setTaskInfo(task);
          this.view.rerender(task);
        }
      });
    });

    eventBus.subscribe(`delete-task-${task.id}`, () => {
      this.taskManager.deleteTask(task.id).then((res) => {
        if (res?.status === 200) {
          this.model.deleteTaskInfo();
          this.view.deleteTask(task.id);
        }
      });
    });

    eventBus.subscribe('create-new-task', (task) => {
      this.taskManager.createTask(task).then((data) => {
        if (data && data.id) {
          task.id = data.id;
          this.model.setTaskInfo(task);
          this.view.render(task);
        }
      });
    });


    // UNCOMMENT WHEN WE HAVE BACKEND

    eventBus.subscribe(`toggle-favourite-${task.id}`, ({ id, isFavourite }) => {
      console.log(`isFavourite: ${isFavourite} ID: ${id}`);
      // this.taskManager.toggleFavourite(id, isFavourite).then((res) => {
      //   if (res?.status === 200) {
      //     this.model.setTaskInfo({ ...this.model.getTaskInfo(), isFavourite });
      //     this.view.rerender(this.model.getTaskInfo());
      //   }
      // });
    });
  }
}
