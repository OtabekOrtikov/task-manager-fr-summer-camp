import './task.scss';
import { formatDate, getPriority, getStatus } from '../../../utils';
import { eventBus } from '../../../utils/event-bus';

export class TaskView {
  selector = 'task';

  constructor() {}

  render(task, taskClickHandler) {
    const activePage = document.querySelector('.main--nav li.active').dataset.layout;

    if (activePage === 'table') {
      this.renderInTable(task, taskClickHandler);
    } else if (activePage === 'board') {
      this.renderInDashboard(task, taskClickHandler);
    }
  }

  renderInDashboard({ id, title, content, priority, status, createdDate, dueDate, isFavourite = false }, taskClickHandler) {
    createdDate = new Date(createdDate);
    dueDate = new Date(dueDate);
  
    const existingTask = document.querySelector(`[task-id="${id}"]`);
    if (existingTask) {
      existingTask.parentNode.removeChild(existingTask);
    }
  
    const task_dashboard = document.createElement('article');
    task_dashboard.classList.add(this.selector, 'dashboard--item');
    if (isFavourite) {
      task_dashboard.classList.add('favourite');
    }
    task_dashboard.setAttribute('task-id', id);
    task_dashboard.innerHTML = `
      <h5 class="dashboard--item_title">${title}</h5>
      <p class="dashboard--item_desc">${content}</p>
      <div class="dashboard--item_info">
        <p class="dashboard--item_info-priority"></p>
        <p class="dashboard--item_info-duedate">${formatDate(dueDate)}</p>
      </div>
      <div class="dashboard--item-actions">
        <button class="fa${isFavourite ? 's' : 'r'} fa-star favourite-icon ${isFavourite ? 'gold' : ''}" id="task-favourite-${id}" aria-label="Toggle Favourite"></button>
      </div>
    `;
  
    const priorityElement = task_dashboard.querySelector('.dashboard--item_info-priority');
    if (priority) {
      priorityElement.appendChild(getPriority(priority));
    } else {
      console.error('Priority is undefined.');
    }
  
    let columnSelector;
    switch (status) {
      case 'TODO':
        columnSelector = '#todo-column';
        break;
      case 'IN_PROGRESS':
        columnSelector = '#progress-column';
        break;
      case 'REVIEW':
        columnSelector = '#review-column';
        break;
      case 'DONE':
        columnSelector = '#done-column';
        break;
      default:
        console.error('Unknown status:', status);
        return;
    }
  
    const column = document.querySelector(columnSelector);
    if (column) {
      column.appendChild(task_dashboard);
      this.reorderFavouriteTasks(column);
    } else {
      console.error('Column not found for selector:', columnSelector);
    }
  
    task_dashboard.addEventListener('click', (e) => {
      if (e.target.closest('.favourite-icon')) {

        let favButton = e.target.closest('.favourite-icon');
        isFavourite = !isFavourite;
        favButton.classList.toggle('fas', isFavourite);
        favButton.classList.toggle('far', !isFavourite);
        favButton.classList.toggle('gold', isFavourite);
        task_dashboard.classList.toggle('favourite', isFavourite);
  
        this.reorderFavouriteTasks(column);
  
        eventBus.publish(`toggle-favourite-${id}`, { id, isFavourite });
      } else {
        taskClickHandler(id);
      }
      e.stopPropagation();
    });
  }

  reorderFavouriteTasks(column) {
    const tasks = Array.from(column.querySelectorAll('.dashboard--item'));
    const favourites = tasks.filter(task => task.classList.contains('favourite'));
    const nonFavourites = tasks.filter(task => !task.classList.contains('favourite'));

    column.innerHTML = '';
    favourites.forEach(task => column.appendChild(task));
    nonFavourites.forEach(task => column.appendChild(task));
  }

  renderInTable({
    content,
    createdDate,
    dueDate,
    id,
    priority,
    status,
    title,
    isFavourite = false
  }, taskClickHandler) {
  createdDate = new Date(createdDate);
  dueDate = new Date(dueDate);

  const taskRow = document.createElement('tr');
  taskRow.classList.add(this.selector, 'task-list--row');
  taskRow.setAttribute('task-id', id);
  taskRow.innerHTML = `
    <td class="favorite-column" id="task-favourite-${id}">
      <button class="fa${isFavourite ? 's' : 'r'} fa-star favourite-icon ${isFavourite ? 'gold' : ''}" id="task-favourite-${id}" aria-label="Toggle Favourite"></button>
    </td>
    <td class="task-column" id="task-title-${id}">
      <span class="task-title">${title}</span>
      <i class="task-column--icon fa-solid fa-up-right-and-down-left-from-center"></i>
    </td>
    <td class="description-column" id="task-description-${id}">${content}</td>
    <td class="creation-date-column" id="task-creation-date-${id}">${formatDate(createdDate)}</td>
    <td class="due-date-column" id="task-due-date-${id}">${formatDate(dueDate)}</td>
    <td class="priority-column" id="task-priority-${id}"></td>
    <td class="status-column" id="task-status-${id}"></td>
  `;

  taskRow.querySelector(`#task-priority-${id}`).appendChild(getPriority(priority));
  taskRow.querySelector(`#task-status-${id}`).appendChild(getStatus(status));

  this.reorderTableTasks(taskRow);

  taskRow.addEventListener('click', (e) => {
    if (e.target.closest('.favourite-icon')) {
      isFavourite = !isFavourite;
      const starButton = e.target.closest('.favourite-icon');
      starButton.classList.toggle('fas', isFavourite);
      starButton.classList.toggle('far', !isFavourite);
      starButton.classList.toggle('gold', isFavourite);
      taskRow.classList.toggle('favourite', isFavourite);

      this.reorderTableTasks(taskRow);
  
      eventBus.publish(`toggle-favourite-${id}`, { id, isFavourite });

      e.stopPropagation();
    } else {
      taskClickHandler(id);
    }
  });

  document.querySelector('.task-list tbody').appendChild(taskRow);
}

reorderTableTasks(newTaskRow) {
  const taskTableBody = document.querySelector('.task-list tbody');
  const tasks = Array.from(taskTableBody.querySelectorAll('tr'));
  const favourites = tasks.filter(task => task.querySelector('.favourite-icon').classList.contains('gold'));
  const nonFavourites = tasks.filter(task => !task.querySelector('.favourite-icon').classList.contains('gold'));

  taskTableBody.innerHTML = '';
  if (newTaskRow) {
    if (newTaskRow.querySelector('.favourite-icon').classList.contains('gold')) {
      favourites.unshift(newTaskRow);
    } else {
      nonFavourites.push(newTaskRow);
    }
  }
  favourites.forEach(task => taskTableBody.appendChild(task));
  nonFavourites.forEach(task => taskTableBody.appendChild(task));
}

  rerender(task) {
    const taskEl = document.querySelector(`[task-id="${task.id}"]`);
    const activePage = document.querySelector('.main--nav li.active').dataset.layout;
  
    if (taskEl) {
      if (activePage === 'table') {
        this.updateTable(task);
      } else if (activePage === 'board') {
        this.updateBoard(task, taskEl);
      }
    } else {
      console.error(`Task element not found for task id ${task.id}`);
    }
  }
  
  updateTable(task) {
    const titleElement = document.querySelector(`#task-title-${task.id} .task-title`);
    const descriptionElement = document.querySelector(`#task-description-${task.id}`);
    const dueDateElement = document.querySelector(`#task-due-date-${task.id}`);
    const priorityElement = document.querySelector(`#task-priority-${task.id}`);
    const statusElement = document.querySelector(`#task-status-${task.id}`);
  
    if (titleElement) titleElement.textContent = task.title;
    if (descriptionElement) descriptionElement.textContent = task.content;
    if (dueDateElement) dueDateElement.textContent = formatDate(new Date(task.dueDate));
    if (priorityElement) {
      priorityElement.innerHTML = '';
      priorityElement.appendChild(getPriority(task.priority));
    }
    if (statusElement) {
      statusElement.innerHTML = '';
      statusElement.appendChild(getStatus(task.status));
    }
  }
  
  updateBoard(task, taskEl) {
    const currentColumnSelector = this.getColumnSelector(task.status);
    const currentColumn = document.querySelector(currentColumnSelector);
  
    if (currentColumn && currentColumn.contains(taskEl)) {
      currentColumn.removeChild(taskEl);
    }
  
    this.updateBoardTaskDetails(task, taskEl);
  
    const newColumnSelector = this.getColumnSelector(task.status);
    const newColumn = document.querySelector(newColumnSelector);
    if (newColumn) {
      newColumn.appendChild(taskEl);
    } else {
      console.error('Column not found for selector:', newColumnSelector);
    }
  }
  
  updateBoardTaskDetails(task, taskEl) {
    const titleElement = taskEl.querySelector('.dashboard--item_title');
    const descriptionElement = taskEl.querySelector('.dashboard--item_desc');
    const dueDateElement = taskEl.querySelector('.dashboard--item_info-duedate');
    const priorityElement = taskEl.querySelector('.dashboard--item_info-priority');
    const statusElement = taskEl.querySelector('.dashboard--item_status');
  
    if (titleElement) titleElement.textContent = task.title;
    if (descriptionElement) descriptionElement.textContent = task.content;
    if (dueDateElement) dueDateElement.textContent = formatDate(new Date(task.dueDate));
    if (priorityElement) {
      priorityElement.innerHTML = '';
      priorityElement.appendChild(getPriority(task.priority));
    }
    if (statusElement) {
      statusElement.innerHTML = '';
      statusElement.appendChild(getStatus(task.status));
    }
  }
  
  getColumnSelector(status) {
    switch (status) {
      case 'TODO':
        return '#todo-column';
      case 'IN_PROGRESS':
        return '#progress-column';
      case 'REVIEW':
        return '#review-column';
      case 'DONE':
        return '#done-column';
      default:
        console.error('Unknown status:', status);
        return null;
    }
  }

  deleteTask(id) {
    const taskElement = document.querySelector(`[task-id="${id}"]`);
    if (taskElement) {
      taskElement.parentNode.removeChild(taskElement);
    }
  }
}
