import { useState, useRef, useEffect } from "react";

export const Exp1 = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    console.log("useEffect");
  }, [null]);
  return <button onClick={() => setCount((prev) => prev + 1)}>{count}</button>;
};
