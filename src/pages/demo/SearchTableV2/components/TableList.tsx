import React, {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Table, TableColumnsType, message } from "antd";

interface Ref {
  reload: () => void;
}

interface Props {
  columns: TableColumnsType<any>;
  searchParams: any;
}

const fetchData = async (params) => {
  console.log("Fetching data with params:", params);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.99) {
        reject(new Error("Failed to fetch data"));
      } else {
        resolve({
          data: Array.from({ length: 10 }, (_, i) => ({
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

export const TableList = forwardRef<Ref, Props>(
  ({ columns, searchParams }, ref) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({
      current: 1,
      pageSize: 10,
      total: 0,
    });

    const fetchTableData = async (params = {}) => {
      setLoading(true);
      try {
        const res = await fetchData({
          ...searchParams,
          current: params.current ?? pagination.current,
          pageSize: pagination.pageSize,
        });
        setData(res.data);
        setPagination((prev) => ({ ...prev, total: res.total }));
      } catch (error: any) {
        message.error(error.message || "Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    const reload = () => {
      setPagination((prev) => ({ ...prev, current: 1 }));
      fetchTableData({ current: 1 });
    };

    useEffect(() => {
      reload();
    }, [searchParams]);

    useImperativeHandle(ref, () => ({
      reload,
    }));

    return (
      <Table
        columns={columns}
        dataSource={data}
        pagination={pagination}
        loading={loading}
        onChange={(newPagination) => {
          setPagination((prev) => ({ ...prev, ...newPagination }));
          fetchTableData({
            current: newPagination.current,
            pageSize: newPagination.pageSize,
          });
        }}
      />
    );
  }
);
