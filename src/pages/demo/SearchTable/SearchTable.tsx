import React, { useState, useEffect } from "react";
import { Table, Button, Input, Form, Modal, message } from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";

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
            address: `Address ${i + 1}`
          })),
          total: 100
        });
      }
    }, 1000);
  });
};

const TableTemplate = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });
  const [modalVisible, setModalVisible] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchParams, setSearchParams] = useState({});

  const fetchTableData = async (params = {}) => {
    setLoading(true);
    try {
      const res = await fetchData({
        ...searchParams,
        ...params,
        page: params.page ?? pagination.current,
        pageSize: pagination.pageSize
      });
      setData(res.data);
      setPagination((prev) => ({ ...prev, total: res.total }));
    } catch (error) {
      message.error(error.message || "Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const defaultValues = {
      name: urlParams.get("name") || "",
    };
    form.setFieldsValue(defaultValues);
    setSearchParams(defaultValues);
    setPagination((prev) => ({ ...prev, current: 1 }));
    fetchTableData({ ...defaultValues, page: 1 });
  }, []);

  const handleSearch = () => {
    const values = form.getFieldsValue();
    setSearchParams(values);
    setPagination((prev) => ({ ...prev, current: 1 }));
    fetchTableData({ ...values, page: 1 });
  };

  const handleReset = () => {
    form.resetFields();
    setSearchParams({});
    setPagination((prev) => ({ ...prev, current: 1 }));
    fetchTableData({ page: 1 });
  };

  const handleTableChange = (newPagination) => {
    setPagination((prev) => {
      const updatedPagination = { ...prev, ...newPagination };
      fetchTableData({ ...searchParams, page: updatedPagination.current, pageSize: updatedPagination.pageSize });
      return updatedPagination;
    });
  };

  const handleEdit = (record) => {
    setEditingItem(record);
    setModalVisible(true);
  };

  const handleDelete = (key) => {
    message.success("Deleted successfully");
    setPagination((prev) => ({ ...prev, current: 1 }));
    fetchTableData({ ...searchParams, page: 1 });
  };

  const handleModalOk = async () => {
    setModalLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    message.success(editingItem ? "Updated successfully" : "Created successfully");
    setModalLoading(false);
    setModalVisible(false);
    setEditingItem(null);
    setPagination({ ...pagination, current: 1 });
    fetchTableData({ ...searchParams, page: 1 });
  };

  return (
    <div>
      <Form layout="inline" form={form} onFinish={handleSearch}>
        <Form.Item name="name" label="Name">
          <Input placeholder="Enter name" allowClear />
        </Form.Item>
        <Button type="primary" htmlType="submit" loading={loading} icon={<SearchOutlined />}>Search</Button>
        <Button onClick={handleReset} style={{ marginLeft: 8 }}>Reset</Button>
      </Form>
      <Button type="primary" icon={<PlusOutlined />} onClick={() => setModalVisible(true)} style={{ margin: "16px 0" }}>New</Button>
      <Table
        columns={[
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
        ]}
        dataSource={data}
        pagination={pagination}
        loading={loading}
        onChange={handleTableChange}
      />
      <Modal
        title={editingItem ? "Edit Item" : "New Item"}
        open={modalVisible}
        confirmLoading={modalLoading}
        onCancel={() => setModalVisible(false)}
        onOk={handleModalOk}
      >
        <Form initialValues={editingItem}>
          <Form.Item name="name" label="Name" rules={[{ required: true }]}> <Input /> </Form.Item>
          <Form.Item name="age" label="Age" rules={[{ required: true }]}> <Input type="number" /> </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TableTemplate;
