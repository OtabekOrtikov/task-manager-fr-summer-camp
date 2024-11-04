export const MonthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const Priorities = {
  LOW: 'Low',
  MEDIUM: 'Medium',
  TOP: 'High'
};

export const Statuses = {
  DONE: 'Done',
  IN_PROGRESS: 'In Progress',
  REVIEW: 'Review',
  TODO: 'To Do'
};

export function formatNumber(num, len = 2) {
  return `${num}`.padStart(len, '0')
}

export function formatDate(date) {
  const month = MonthNames[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  return `${month} ${day}, ${year}`
}

export const formatDateCreation = (date) => {
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  const hours = ('0' + date.getHours()).slice(-2);
  const minutes = ('0' + date.getMinutes()).slice(-2);

  return date.getTime();
};

export function formatDateForBackend(date) {
  const year = formatNumber(date.getFullYear(), 4);
  const month = formatNumber(date.getMonth() + 1);
  const day = formatNumber(date.getDate());
  const hours = formatNumber(date.getHours());
  const minutes = formatNumber(date.getMinutes());

  return date.getTime()
}

export function getPriority(priority) {
  const priorityLabel = Priorities[priority];
  const priorityEl = document.createElement('div');

  priorityEl.classList.add('priority', `${priorityLabel.toLowerCase()}-priority`);
  priorityEl.innerText = priorityLabel;

  return priorityEl;
}

export function getStatus(status) {
  const statusLabel = Statuses[status];
  const statusEl = document.createElement('div');

  statusEl.classList.add('status', `status__${status.toLowerCase()}`);
  statusEl.innerText = statusLabel;

  return statusEl;
}

export function getSelectedOption(select) {
  return select.options[select.selectedIndex].value;
}

export function getActiveView() {
  return document.querySelector('.main--content').firstChild.dataset.view;
}
