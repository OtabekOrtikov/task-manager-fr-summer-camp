import "./task-list.scss";
import { eventBus } from '../../../utils/event-bus';

export class TaskListView {
  selector = '.main--content';

  constructor() {
  }

    render() {
        const taskList = document.createElement('div');
        taskList.classList.add('table-board')
        taskList.dataset.view = 'table';
        taskList.innerHTML = `
          <div class="task-list--wrapper">
            <table class="task-list">
              <thead>
                <tr class="task-list--heading">
                  <th class="favorite-column"></th>
                  <th class="task-column">Task</th>
                  <th class="description-column">Description</th>
                  <th class="creation-date-column">Creation Date</th>
                  <th class="due-date-column">Due Date</th>
                  <th class="priority-column">Priority</th>
                  <th class="status-column">Status</th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
          </div>
          <button class="add-card">
             <div class="icon">
               <i class="fa-solid fa-plus"></i>
             </div>
            Add a card
          </button>
        `;

      taskList.querySelector('.add-card')
        .addEventListener('click', () => {
          eventBus.publish('open-modal');
        });

        document.querySelector(this.selector).innerHTML = '';
        document.querySelector(this.selector).appendChild(taskList);
    }

}
