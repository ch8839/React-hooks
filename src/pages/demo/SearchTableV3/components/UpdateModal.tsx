import { Form, Modal, Input, message } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect } from "react";

export const UpdateModal = ({
  visible,
  loading,
  editingItem,
  onCancel,
  onOk,
}: any) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(editingItem);
  }, [editingItem]);

  return (
    <Modal
      open={visible}
      confirmLoading={loading}
      onCancel={onCancel}
      onOk={onOk}
      title={editingItem ? "Edit Item" : "New Item"}
    >
      <Form form={form} initialValues={editingItem}>
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="age" label="Age" rules={[{ required: true }]}>
          <Input type="number" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
