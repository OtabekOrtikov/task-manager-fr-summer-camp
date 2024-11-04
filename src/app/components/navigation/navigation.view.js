import { DashboardController } from '../dashboard/dashboard.controller';
import { TaskListController } from '../task-list/task-list.controller';
import { eventBus } from '../../../utils/event-bus';

export class NavigationView {
  eventbus = eventBus

  constructor() {
    this.selector = '.main--nav';
    this.render();
  }

  render() {
    const nav = document.createElement('ul');
    nav.innerHTML = `
      <ul>
        <li data-layout="table"><a href="#">Table view</a></li>
        <li class="active" data-layout="board"><a href="#">Board view</a></li>
      </ul>
    `;

    nav.addEventListener('click', (e) => this.handleNavClick(e, nav));

    document.querySelector(this.selector).appendChild(nav);
  }

  handleNavClick(e, nav) {
    const activeView = document.querySelector('nav .active').dataset.layout;
    let li = e.target;
    if (li.tagName === 'A') {
      li = li.parentElement;
    }

    if (li.tagName !== 'LI' || li.classList.contains('active')) {
      return;
    }

    nav.querySelectorAll('li').forEach(el => el.classList.remove('active'));
    li.classList.add('active');

    const view = li.dataset.layout;

    if (activeView === view) {
      return;
    }

    if (view === 'board') {
      document.querySelector(".table-board").remove();
      eventBus.publish('render-dashboard');

      // new DashboardController();
    } else if (view === 'table') {
      document.querySelector(".dashboard").remove();
      eventBus.publish('render-table');
      // new TaskListController();
    }
  }
}
