export interface TableItem {
  id: number | string;
  name: string;
  age: number;
  // 其他字段...
}

export interface FetchTableParams {
  current?: number;
  pageSize?: number;
  [key: string]: any; // 允许其他筛选参数
}

export interface FetchTableResponse {
  data: TableItem[];
  total: number;
}

export const fetchTableData = async (
  params: FetchTableParams
): Promise<FetchTableResponse> => {
  console.log("Fetching data with params:", params);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.99) {
        reject(new Error("Failed to fetch data"));
      } else {
        resolve({
          data: Array.from({ length: 10 }, (_, i) => ({
            id: i,
            key: i,
            name: `Item ${i + 1}`,
            age: 20 + i,
            address: `Address ${i + 1}`,
          })),
          total: 100,
        });
      }
    }, 1000);
  });
};

// export const fetchTableData = async (params) => {
//   const response = await fetch(`/api/tableData?${new URLSearchParams(params)}`);
//   if (!response.ok) throw new Error("Failed to fetch data");
//   return response.json();
// };

export const createItem = async (data) => {
  const response = await fetch(`/api/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to create item");
  return response.json();
};

export const updateItem = async (data) => {
  const response = await fetch(`/api/items/${data.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to update item");
  return response.json();
};
