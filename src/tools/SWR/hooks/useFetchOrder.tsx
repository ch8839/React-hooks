import useSWR, { preload } from "swr";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// 通用的请求函数
async function fetchOrderData({ url, params }: { url: string; params: any }) {
  // 这里放置你的请求逻辑，比如 fetch、axios等
  const response = await fetch(url);
  return response.json();
}

async function fetchOrderData2(
  { url, params }: { url: string; params: any },
  option?: any
) {
  console.log("[request] fetchOrderData2");
  await delay(2000);
  return {
    code: 0,
    data: {
      name: "Tom",
      age: 18,
      fetchType: option?.preload ? "preload" : "fetch",
    },
  };
}

export function useFetchOrder(params: any, option?: any) {
  const url = "/order/data";
  const key = [url, params];
  const { data, error } = useSWR(
    key,
    ([url, params]) => fetchOrderData2({ url, params }, option),
    {
      onSuccess: (data) => {
        console.log(">>>fetchOrder success", data);
      },
      onError(err) {
        console.log(">>>fetchOrder err", err);
      },
      fallbackData: {
        code: 0,
        data: {
          name: "Loading...",
          age: 1,
          fetchType: "fallback",
        },
      },
    }
  );
  console.log(">>>useFetchOrder res", data?.data);
  return { data: data?.data, error };
}

export async function preloadOrderData(params?: any, option?: any) {
  const url = "/order/data";
  const key = [url, params];
  const res = await preload(key, ([url, params]) =>
    fetchOrderData2({ url, params }, option)
  );
  console.log(">>>preloadOrderData res", res);
}
