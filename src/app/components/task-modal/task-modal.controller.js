import { TaskModalView } from './task-modal.view';
import { TaskModalModel } from './task-modal.model';
import { eventBus } from '../../../utils/event-bus';

export class TaskModalController {

  view = new TaskModalView();
  model = new TaskModalModel();

  constructor() {
    eventBus.subscribe('open-modal', (task) => {
      this.view.render(task);
    })
  }
}
