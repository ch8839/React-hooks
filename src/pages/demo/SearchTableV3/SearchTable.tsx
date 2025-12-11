import React, {
  useState,
  useEffect,
  useRef,
} from "react";
import { Button, Modal, message, TableColumnsType } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { SearchBar, TableList, UpdateModal } from "./components";


const TableTemplate = () => {
  const [searchParams, setSearchParams] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const tableRef = useRef<{ reload: () => void }>(null);

  const handleModalOk = async () => {
    setModalLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      message.success("Saved successfully");
      setModalVisible(false);
      tableRef.current?.reload();
    } catch (error) {
      message.error("Failed to save");
    } finally {
      setModalLoading(false);
    }
  };

  const columns: TableColumnsType<any> = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Age", dataIndex: "age", key: "age" },
    { title: "Address", dataIndex: "address", key: "address" },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => handleEdit(record)}>Edit</Button>
          <Button type="link" danger onClick={() => handleDelete(record.key)}>Delete</Button>
        </>
      )
    }
  ];

  const handleEdit = (record) => {
    setEditingItem(record);
    setModalVisible(true);
  };

  const handleDelete = (key) => {
    message.success("Deleted successfully");
    tableRef.current?.reload()
  };

  return (
    <div>
      <SearchBar onSearch={setSearchParams} />
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setModalVisible(true)}
        style={{ margin: "16px 0" }}
      >
        New
      </Button>
      <TableList ref={tableRef} columns={columns} searchParams={searchParams} />
      <UpdateModal
        visible={modalVisible}
        loading={modalLoading}
        editingItem={editingItem}
        onCancel={() => setModalVisible(false)}
        onOk={handleModalOk}
      />
    </div>
  );
};

export default TableTemplate;
