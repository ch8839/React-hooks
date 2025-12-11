import React, { useSyncExternalStore } from "react";
import { store } from "./store";

export const UseSyncExternalStoreExp1 = () => {
  const todos = useSyncExternalStore(store.subscribe, store.getSnapshot);
  const handleClick = () => {
    store.add();
  };
  return (
    <div>
      <button onClick={handleClick}>add</button>
      <br />
      <ul>
        {todos.map((item: any) => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
    </div>
  );
};
