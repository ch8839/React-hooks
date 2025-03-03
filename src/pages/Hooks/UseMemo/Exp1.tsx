import { useState, useRef, useEffect, useMemo } from "react";
const listA = [1, 2, 3];
const listB = [5, 6];

export const Exp1 = () => {
  const [count, setCount] = useState(0);

  // 每次依赖项变化时，useMemo 都会重新执行其回调函数并返回新的数组，即使数组内容相同，其引用是新的
  // 1.保持引用一致
  const list = useMemo(() => {
    return count < 2 ? listA : listB;
  }, [count]);

  // 2.优化依赖项
  const list2 = useMemo(() => {
    return count < 2 ? [1, 2, 3] : [5, 6];
  }, [count < 2]);

  useEffect(() => {
    console.log("useEffect");
  }, [null]);

  useEffect(() => {
    console.log("list change");
  }, [list]);
  useEffect(() => {
    console.log("list2 change");
  }, [list2]);

  return (
    <div>
      <button onClick={() => setCount((prev) => prev + 1)}>{count}</button>
      {list.map((item) => {
        return <div key={item}>{item}</div>;
      })}
    </div>
  );
};
