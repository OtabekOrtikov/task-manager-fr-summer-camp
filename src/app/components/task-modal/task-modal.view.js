import './task-modal.scss';
import { formatDateForBackend, getSelectedOption, formatDateCreation, getActiveView } from '../../../utils';
import { eventBus } from '../../../utils/event-bus';

export class TaskModalView {
  selector = 'task-modal';

  constructor() {}

  render(task) {
    const modal = document.createElement('div');
    modal.classList.add(this.selector);
    modal.innerHTML = `
      <div class="task-modal--content">
        <form class="modal-form">
          <label class="label label--title">
            <input type="text" name="title" placeholder="Name the Task" required/>
          </label>
          <label class="label label--status">
            <span>Status</span>
            <select name="status" required>
              <option value="" selected disabled hidden>Empty</option>
              <option value="TODO">To Do</option> 
              <option value="IN_PROGRESS">In Progress</option>
              <option value="REVIEW">Review</option>
              <option value="DONE">Done</option>
            </select>
          </label>
          <label class="label label--priority">
            <span>Priority</span>
            <select name="priority" required>
              <option value="" selected disabled hidden>Empty</option>
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="TOP">High</option>
            </select>
          </label>
          <label class="label label--due-date">
            <span>Due Date</span>
            <input type="date" name="dueDate" placeholder="Empty" required/>
          </label>
          <label class="label label--creation-date">
            <span>Creation Date</span>
            <input type="date" name="createdDate" required disabled/>
          </label>
          <label class="label label--description">
            <span>Description</span>
            <textarea name="content" placeholder="Please describe the Task" required></textarea>
          </label>
          <div class="task-modal--buttons">
            ${ task ? `
            <button class="delete-button" type="button">
              <i class="fa-solid fa-trash"></i>
              Delete
            </button>
            `: '' }
            <button class="submit-button" type="submit">Save</button>
          </div>
        </form>
        <button class="close-modal-button">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
      <div class="modal-background"></div>
    `;

    modal.querySelector('.close-modal-button').addEventListener('click', () => { this.close() });
    modal.querySelector('.modal-background').addEventListener('click', () => { this.close() });
    modal.querySelector('.modal-form').addEventListener('submit', (e) => {
      e.preventDefault();
      this.submitForm(modal, task?.id);
    });

    if (task) {
      this.fillModal(task, modal);

      modal.querySelector('.delete-button').addEventListener('click', (e) => {
        e.preventDefault();
        eventBus.publish(`delete-task-${task.id}`);
        this.close();
      });
    }

    modal.querySelector('input[name="createdDate"]').valueAsDate = new Date();
    this.setMinDateForDueDate(modal.querySelector('input[name="dueDate"]'));
    document.querySelector('body').appendChild(modal);
  }

  setMinDateForDueDate(dueDateInput) {
    const today = new Date();
    // const yesterday = new Date(today);
    // yesterday.setDate(yesterday.getDate() - 1);
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const minDate = `${yyyy}-${mm}-${dd}`;
    dueDateInput.min = minDate;
    dueDateInput.max = "2100-12-31";
  }

  submitForm(modalEl, id) {
    const task = this.getTaskInfo(modalEl);

    if (id) {
      task.id = id;
    }

    const activeView = getActiveView();
    const createTaskEvent = `create-task-${activeView}`;

    eventBus.publish(id ? `update-task-${id}` : createTaskEvent, task);
    this.close();
  }

  getTaskInfo(modalEl) {
    const dueDateVal = modalEl.querySelector('input[name="dueDate"]').value;

    return {
      title: modalEl.querySelector('input[name="title"]').value,
      status: getSelectedOption(modalEl.querySelector('select[name="status"]')),
      priority: getSelectedOption(modalEl.querySelector('select[name="priority"]')),
      dueDate: formatDateForBackend(new Date(dueDateVal)),
      createdDate: formatDateCreation(new Date()),
      content: modalEl.querySelector('textarea[name="content"]').value,
    }
  }

  fillModal(task, modalEl) {
    modalEl.querySelector('input[name="title"]').value = task.title;
    modalEl.querySelector('select[name="status"]').value = task.status;
    modalEl.querySelector('select[name="priority"]').value = task.priority;
    modalEl.querySelector('input[name="dueDate"]').valueAsDate = new Date(task.dueDate);
    modalEl.querySelector('input[name="createdDate"]').valueAsDate = new Date(task.createdDate);
    modalEl.querySelector('textarea').value = task.content;
  }

  close() {
    const modalEl = document.querySelector(`.${this.selector}`);
    modalEl.remove();
  }
}
