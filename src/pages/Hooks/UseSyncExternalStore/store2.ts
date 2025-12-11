let id = 1;
let state: any[] = [];
const listeners = new Set<() => void>();

export const store = {
  subscribe: (listener: () => void) => {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
  getSnapshot: () => {
    return state;
  },
  add: () => {
    state = [...state, { id: id++, text: `#todo ${id}` }];
    listeners.forEach(listener => listener());
    console.log("state", state);
  },
};
