import React, {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
  useMemo,
} from "react";
import { Table, TableColumnsType, message } from "antd";
import { useTableData } from "../hooks";
import { FetchTableParams } from "../api";

interface Ref {
  reload: () => void;
}

interface Props {
  columns: TableColumnsType<any>;
  searchParams: FetchTableParams;
}

export const TableList = forwardRef<Ref, Props>(
  ({ columns, searchParams }, ref) => {
    const [pagination, setPagination] = useState({
      current: 1,
      pageSize: 10,
    });

    const [reqParams, setReqParams] = useState({
      ...searchParams,
      ...pagination,
    });

    const { data, error, isValidating, isLoading, mutate } = useTableData(reqParams);

    const reload = () => {
      // setPagination((prev) => ({ ...prev, current: 1 }));
      mutate();
    };

    // useEffect(() => {
    //   setPagination((prev) => ({ ...prev, current: 1 }));
    //   setReqParams({
    //     ...searchParams,
    //     ...pagination,
    //     current: 1
    //   });
    // }, [searchParams]);

    /*
    存在问题：searchParams变更后，触发setPagination重置为1
    然后触发第二个useEffect，此时pagination还未更新会,会拿之前的current去请求接口，
    然后pagination重置为1更新完毕再次触发第二个useEffect，再更新完整的reqParams
    useEffect(() => {
      console.log('>>>pagination1')
      setPagination((prev) => ({ ...prev, current: 1 }));
    }, [searchParams]);

    useEffect(() => {
      console.log('>>>pagination2', pagination)
      setReqParams({
        ...searchParams,
        ...pagination,
      });
    }, [pagination, searchParams]);
    */

    useEffect(() => {
      setPagination((prev) => {
        const newVal = { ...prev, current: 1 };
        setReqParams({
          ...searchParams,
          ...newVal,
        });
        return newVal;
      });
    }, [searchParams]);

    useEffect(() => {
      setReqParams((prev) => ({
        ...prev,
        ...pagination,
      }));
    }, [pagination]);

    useImperativeHandle(ref, () => ({
      reload,
    }));

    return (
      <Table
        columns={columns}
        dataSource={data?.data}
        pagination={{ ...pagination, total: data?.total || 0 }}
        loading={isLoading}
        onChange={(newPagination) => {
          setPagination((prev) => ({ ...prev, ...newPagination }));
          // setReqParams({
          //   ...searchParams,
          //   ...newPagination,
          // });
        }}
      />
    );
  }
);
