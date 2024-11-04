class EventBus {
  constructor() {
    this.eventObject = {};
    this.callbackId = 0;
  }

  publish(eventName, ...args) {
    const callbackObject = this.eventObject[eventName];

    if (!callbackObject) return console.warn(eventName + " not found!");

    for (let id in callbackObject) {
      callbackObject[id](...args);
    }
  }

  subscribe(eventName, callback) {
    if (!this.eventObject[eventName]) {
      // Use object storage to improve the efficiency of deletion when logging out the callback function
      this.eventObject[eventName] = {};
    }

    const id = this.callbackId++;

    this.eventObject[eventName][id] = callback;

    const unSubscribe = () => {
      delete this.eventObject[eventName][id];

      if (Object.keys(this.eventObject[eventName]).length === 0) {
        delete this.eventObject[eventName];
      }
    };

    return { unSubscribe };
  }
}

export const eventBus= new EventBus();
