import { eventBus } from '../../utils/event-bus'

export class TaskManagerService {
    constructor() {}

    getTasks() {
        return fetch('http://localhost:8081/task')
            .then(response => response.json())
            .catch(e => console.error(e));
    }

    createTask(task) {
        return fetch('http://localhost:8081/task', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task),
        })
            .catch(e => console.error(e));
    }


    updateTask(task) {
        return fetch(`http://localhost:8081/task/${task.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task),
        })
            .catch(e => console.error(e));
    }

    deleteTask(id) {
        return fetch(`http://localhost:8081/task/${id}`, {
            method: 'DELETE',
        }).catch(e => console.error(e));
    }

    // UNCOMMENT WHEN WE HAVE BACKEND

    // toggleFavourite(taskId, isFavourite) {
    //     console.log(`HELLO! ${isFavourite}`)
    //     return fetch(`http://localhost:8081/task/${taskId}/favourite`, {
    //       method: 'PATCH',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify({ isFavourite }),
    //     })
    //     .then(response => response.json())
    //     .catch(e => console.error(e));
    // }
}
