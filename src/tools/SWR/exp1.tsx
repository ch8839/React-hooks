import { useEffect, useState, useMemo, useCallback, useRef } from "react";
import useSWR, { preload } from "swr";
import { useFetchOrder, preloadOrderData } from "./hooks/useFetchOrder";

export const Exp1_SWR = () => {
  const [show, setShow] = useState(false);
  const [preloadTime, setPreloadTime] = useState(Date.now());
  // useEffect(() => {
  //   setTimeout(() => {
  //     preloadOrderData({ account: "123" }, { preload: true });
  //   }, 1000);
  // }, []);

  const firstPreload = ()=> {
    const url = "/order/data";
    const key = [url, { account: "123" }];
    preload(key, ([url, params]) => {
        return {
        code: 0,
        data: {
          name: "Tom222",
          age: 18,
          fetchType: "firstPreload",
        },
      }
    } );
  }

  const preloadFetch = ()=> {
    setPreloadTime(Date.now());
    preloadOrderData({ account: "123" }, { preload: true });
  }

  return (
    <div>
      <button onClick={() => setShow(true)}>Show User</button>
      <button onClick={() => firstPreload()}>firstPreload</button>
      <button onClick={() => preloadFetch()}>preloadOrderData</button>
      {show ? <User preloadTime={preloadTime} /> : null}
    </div>
  );
};

function User({ preloadTime }: { preloadTime: number }) {
  const { data } = useFetchOrder({ account: "123" });
  const prevTimeRef = useRef(Date.now());
  // useEffect(() => {
  //   console.log("data", data);
  //   const preloadDiff = +Date.now() - preloadTime;
  //   const diff = +Date.now() - prevTimeRef.current;
  //   prevTimeRef.current = Date.now();
  //   // data更新与上一次data更新的时间差
  //   console.log("diff", diff);
  //   // data更新与开始预加载的时间差
  //   console.log("preloadDiff", preloadDiff);
  // }, [data]);

  return (
    <div>
      <h1>SWR</h1>
      <h2>{data?.name}</h2>
      <h2>{data?.fetchType}</h2>
    </div>
  );
}
