import { useCallback, useRef } from "react";
import { fetcher } from "src/utils/fetcher";

export interface Cat {
  name: string;
  age: number;
  breed: string;
}

export const TodoList = () => {
  const abortControllerRef = useRef<AbortController | null>(null);

  const handleGetList = useCallback(async () => {
    const res = await fetcher("/cats/getAllCats");

    console.log("handleGetList res", res);
  }, []);

  const handleAdd = useCallback(async () => {
    abortControllerRef.current = new AbortController();

    const body: Cat = {
      name: "Tom",
      age: 2,
      breed: "A",
    };
    const res = await fetcher("/cats/create", {
      method: "POST",
      // headers: {
      //   "content-type": "application/json"
      // },
      body: body,
      abortController: abortControllerRef.current,
    });
    console.log("handleAdd res", res);
  }, []);

  const handleAbortController = useCallback(() => {
    abortControllerRef.current?.abort();
  }, [abortControllerRef.current]);

  const handleGetUsers = async () => {
    const res = await fetcher("/cats/getUsers");

    console.log("handleGetUsers res", res);
  };
  const handleGetError = async () => {
    try {
      const res = await fetcher("/cats/getError2");

      console.log("handleGetError res", res);
    } catch (e) {
      console.log("handleGetError error", e);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <button onClick={handleGetList}>getList</button>
      <button onClick={handleAdd}>add</button>

      <button onClick={handleAbortController}>abortController</button>

      <button onClick={handleGetUsers}>getUsers</button>
      <button onClick={handleGetError}>getError</button>
    </div>
  );
};
