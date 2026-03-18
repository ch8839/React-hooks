import React from "react";
import { Form, Modal } from "antd";
import { Context } from "./Trigger";

export const FormDemo = () => {
  const [form] = Form.useForm();
  const { open, onCancel, destroy } = React.useContext(Context);

  return (
    <Modal
      title="Basic Modal"
      open={open}
      onOk={() => {
        form.submit();
      }}
      onCancel={onCancel}
      afterClose={destroy}
    >
      <Form form={form} initialValues={{ username: "" }} onFinish={(values) => {
        console.log("submit", values);
        onCancel();
      }}>
        <Form.Item label="Username" name="username">
          <input />
        </Form.Item>
      </Form>
    </Modal>
  );
};