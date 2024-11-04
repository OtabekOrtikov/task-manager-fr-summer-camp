import { AppView } from "./app.view";
import { AppModel } from "./app.model";
import { HeaderController } from "../header/header.controller";
import { NavigationController } from '../navigation/navigation.controller';
import { DashboardController } from "../dashboard/dashboard.controller";
import { TaskModalController } from '../task-modal/task-modal.controller';
import { TaskListController } from '../task-list/task-list.controller';

export class AppController {
  view = new AppView();
  model = new AppModel();

  header = new HeaderController();
  navigation = new NavigationController();
  dashboard = new DashboardController();
  taskList = new TaskListController();
  taskModal = new TaskModalController();

  constructor() {}
}
