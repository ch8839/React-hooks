let id = 0;

export const store = {
  state: [] as any,
  listeners: new Set(),
  subscribe: function(listener: () => void) {
    store.listeners.add(listener);
    return function() {
      store.listeners.delete(listener);
    };
  },
  add: function() {
    store.state = [...store.state, { id: id++, text: `#todo ${id}` }];
    store.emitChange()
    console.log("store.state", store.state)
  },
  emitChange: function() {
    console.log('>>>emitChange', store.listeners)
    store.listeners.forEach((listener: any) => listener());
  },
  getSnapshot: function() {
    return store.state;
  },
};
