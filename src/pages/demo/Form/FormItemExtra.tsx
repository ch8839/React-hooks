import React, { useState } from "react";
import { Form, Input, Select, FormItemProps } from "antd";

export const FormItemExtra = () => {
  const [form] = Form.useForm();
  return (
    <div style={{ padding: 20, background: "#eee" }}>
      <Form form={form} initialValues={{ username: "", password: "" }} onFinish={(values) => {
        console.log("submit", values);

      }}>
        <Form.Item label="Username" name="username">
          <input />
        </Form.Item>
        <MyFormItem label="Password" name="password" render={(children) => {
          return <div>
            <span>Extra:123 </span>
            {children}
            <span>Extra:678 </span>
          </div>;
        }}>
          <input />
        </MyFormItem>
        <Form.Item>
          <button type="submit">Submit</button>
        </Form.Item>
      </Form>
    </div>
  );
};

interface MyFormItemProps extends FormItemProps {
  render?: (children: React.ReactNode) => React.ReactNode;
}

const MyFormItem = (props: MyFormItemProps) => {
  const { render, children, ...restProps } = props;
  return (
    <Form.Item {...restProps}>
      { React.isValidElement(children) ? <MyFormItemChildren render={render}>{children}</MyFormItemChildren> : children }
    </Form.Item>
  );
};

interface MyFormItemChildrenProps {
  render?: (children: React.ReactNode) => React.ReactNode;
  children: React.ReactElement;
}
const MyFormItemChildren = (props: MyFormItemChildrenProps) => {
  const { render, children, ...restProps } = props;
  const _children = React.cloneElement(children, restProps);
  return render ? render(_children) : _children;
};
