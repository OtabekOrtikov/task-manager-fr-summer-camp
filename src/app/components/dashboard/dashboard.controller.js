import { TaskController } from "../task/task.controller";
import { DashboardModel } from "./dashboard.model";
import { DashboardView } from "./dashboard.view";
import { eventBus } from '../../../utils/event-bus';
import {TaskManagerService} from "../../services/task-manager.service";

export class DashboardController {
    view = new DashboardView();
    model = new DashboardModel();
    taskManager = new TaskManagerService();

    constructor() {
        this.model.getTasks().then(tasks => {
            tasks.forEach(task => {
                new TaskController(task);
            })
        });

        eventBus.subscribe('create-task-dashboard', task => {
            this.taskManager.createTask(task)
                .then(result => {
                    if (result?.status === 200) {
                        result.json().then(body => {
                            new TaskController(body);
                        })
                    }
                })
        });

        eventBus.subscribe('render-dashboard', () => {
            this.view.render();
            this.model.getTasks().then(tasks => {
                tasks.forEach(task => {
                    new TaskController(task);
                })
            });
        });
        eventBus.subscribe('render-dashboard', ()=> {
            this.view.render()
        });
    }
}
