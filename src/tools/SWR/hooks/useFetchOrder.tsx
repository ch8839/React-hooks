import useSWR from "swr";

// 通用的请求函数
async function fetchOrderData({ url, params }: { url: string; params: any }) {
  // 这里放置你的请求逻辑，比如 fetch、axios等
  const response = await fetch(url);
  return response.json();
}

export function useFetchOrder(params: any) {
  const url = "/order/data";
  const key = { url, params };
  const { data, error } = useSWR(key, fetchOrderData, {
    onerror() {},
  });

  return { data, error };
}
