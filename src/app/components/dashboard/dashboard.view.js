import "./dashboard.scss";
import { eventBus } from '../../../utils/event-bus';

export class DashboardView {
    selector = '.main--content';

    constructor() {
        this.render();
    }

    render() {

        const dashboard = document.createElement('div');
        dashboard.classList.add('dashboard');
        dashboard.dataset.view = 'dashboard';

        dashboard.innerHTML = `
          <section class="dashboard--columns">
            <div class="dashboard--columns_title">
                <h5>To Do</h5>
                <button id="dashboard-add">
                    <i class="fa-solid fa-plus"></i>
                </button>
            </div>
            <div class="tasks" id="todo-column"></div>
            <button id="dashboard-add" class="dashboard--columns_btn">
                <i class="fa-solid fa-plus"></i>
                <span>Add a card</span>
            </button>
          </section>
          <section class="dashboard--columns">
            <div class="dashboard--columns_title">
                <h5>In Progress</h5>
                <button id="dashboard-add">
                    <i class="fa-solid fa-plus"></i>
                </button>
            </div>
            <div class="tasks" id="progress-column"></div>
            <button id="dashboard-add" class="dashboard--columns_btn">
                <i class="fa-solid fa-plus"></i>
                <span>Add a card</span>
            </button>
          </section>
          <section class="dashboard--columns">
            <div class="dashboard--columns_title">
                <h5>Review</h5>
                <button id="dashboard-add">
                    <i class="fa-solid fa-plus"></i>
                </button>
            </div>
            <div class="tasks" id="review-column"></div>
            <button id="dashboard-add" class="dashboard--columns_btn">
                <i class="fa-solid fa-plus"></i>
                <span>Add a card</span>
            </button>
          </section>
          <section class="dashboard--columns">
            <div class="dashboard--columns_title">
                <h5>Done</h5>
                <button id="dashboard-add">
                    <i class="fa-solid fa-plus"></i>
                </button>
            </div>
            <div class="tasks" id="done-column"></div>
            <button id="dashboard-add" class="dashboard--columns_btn">
                <i class="fa-solid fa-plus"></i>
                <span>Add a card</span>
            </button>
          </section>
        `;

        dashboard.querySelectorAll('#dashboard-add').forEach(btn => {
            btn.addEventListener('click', () => {
                eventBus.publish('open-modal');
            });
        });

        document.querySelector(this.selector).innerHTML = '';
        document.querySelector(this.selector).appendChild(dashboard);
    }
}
