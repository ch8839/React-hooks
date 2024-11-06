import React, { useState, useEffect, useCallback } from "react";

function useEvent<T extends Function>(callback: T): T {
  const fnRef = React.useRef<any>();
  fnRef.current = callback;

  const memoFn = React.useCallback<T>(
    ((...args: any) => fnRef.current?.(...args)) as any,
    []
  );

  return memoFn;
}

export const Exp2 = () => {
  const [count, setCount] = useState(0);

  const handleAsyncCount = useCallback(async()=> {
    const request = ()=> new Promise(resolve => setTimeout(resolve, 1000))
    await request()
    console.log('>>>handleAsyncAdd', count) // 0
  }, [count])

  // 调用 setCount，以 prev 的方式访问最新的 count
  const handleAsyncCount2 = useCallback(async () => {
    const request = () => new Promise((resolve) => setTimeout(resolve, 1000));
    await request();
    setCount((prev) => {
      console.log(">>>handleAsyncCount", prev); // 2
      return prev;
    });
  }, []);

  const handleAsyncCount3 = useEvent(async () => {
    const request = () => new Promise((resolve) => setTimeout(resolve, 1000));
    await request();
    console.log('>>>handleAsyncCount2', count) // 0
  });

  const handleClick = useCallback(() => {
    // setCount(1);
    setCount((prev) => {
      console.log("prev1:", prev); // 1
      return prev + 1;
    });

  }, [handleAsyncCount3]);

  const handleGetCount= useCallback(() => {
    handleAsyncCount();
    handleAsyncCount2();
    handleAsyncCount3();
  }, [handleAsyncCount])

  return (
    <div className="PageLayout">
      <button onClick={handleClick}>add</button>
      <button onClick={handleGetCount}>{count}</button>
    </div>
  );
};
