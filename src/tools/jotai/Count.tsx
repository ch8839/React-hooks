import { useEffect, useState, useMemo } from "react";
import { useCount } from "./hooks/useCount";

export const Count = () => {
  const [count, setCount] = useCount();

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>+</button>
      <span>count: {count}</span>
      <button onClick={() => setCount(count - 1 > 0 ? count - 1 : 0)}>-</button>
    </div>
  );
};
