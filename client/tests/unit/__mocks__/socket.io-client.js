let EVENTS = {};

const socket = {
  on(event, func) {
    if (EVENTS[event]) {
      return EVENTS[event].push(func);
    }
    EVENTS[event] = [func];
  },
  emit() {},
  disconnect() {},
};

export const io = () => socket;

export const serverSocket = {
  emit(event, ...args) {
    const handlers = EVENTS[event];
    if (handlers === undefined) {
      return;
    }

    EVENTS[event].forEach((func) => func(...args));
  },
};

export function cleanup() {
  EVENTS = {};
}

export default io;
