import React, { useEffect } from "react"
import { Button, Input, Form, Modal, message } from "antd";
import { SearchOutlined } from "@ant-design/icons";

interface Props {
  onSearch: (val: any)=> void
}

export const SearchBar: React.FC<Props> = ({ onSearch }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const defaultValues = { name: urlParams.get("name") || "" };
    form.setFieldsValue(defaultValues);
    onSearch(defaultValues);
  }, []);

  const handleSearch = () => {
    onSearch(form.getFieldsValue());
  };

  const handleReset = () => {
    form.resetFields();
    onSearch({});
  };

  return (
    <Form layout="inline" form={form} onFinish={handleSearch}>
      <Form.Item name="name" label="Name">
        <Input placeholder="Enter name" allowClear />
      </Form.Item>
      <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>Search</Button>
      <Button onClick={handleReset} style={{ marginLeft: 8 }}>Reset</Button>
    </Form>
  );
};