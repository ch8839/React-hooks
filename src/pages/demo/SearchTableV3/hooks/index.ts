import useSWR from "swr";
import { fetchTableData, FetchTableResponse, FetchTableParams } from "../api";

export const useTableData = (reqParams: FetchTableParams) => {
  const key = ["tableData", reqParams] as const;
  // console.log(">>>reqParams", reqParams);
  const { data, error, isValidating, isLoading, mutate } =
    useSWR<FetchTableResponse>(
      key,
      ([_, params]: [string, FetchTableParams]) => {
        return fetchTableData(params);
      },
      {
        revalidateOnFocus: false, // 窗口聚焦时自动是否重新验证，默认true
        keepPreviousData: true, // 在新数据加载完成之前是否使用 key 上一次缓存过的数据，默认false
      }
    );
  // isValidating：只要在重新验证就会触发，无论是聚焦时自动请求还是缓存过的key重新请求
  // isLoading：只有当前的key没缓存过数据，需要重新请求数据时才会触发
  // 即使有缓存key，也会请求数据，只是默认会先拿缓存的，且不触发isLoading，
  // 所以给人的感觉是没重新刷新一样，如果想要每次都能感知就用isValidating
  return { data, error, isValidating, isLoading, mutate };
};
