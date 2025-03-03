import { useState, useContext } from "react";

import { useGlobalContext } from "./context";

export const Exp1 = () => {
  const [count, setCount] = useState(0);

  const globalContext = useGlobalContext();

  return (
    <div>
      <button onClick={() => setCount((prev) => prev + 1)}>{count}</button>
      <p>{globalContext.lang}</p>   
      <Theme></Theme>
    </div>
  );
};

const Theme = ()=> {
  // 如果没有 Provider 包裹，组件只能访问默认值，无法动态更新 Context 的值
  const globalContext = useGlobalContext();
  return (
    <div>{globalContext.theme}</div>
  )
}
