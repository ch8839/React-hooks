import React, { useEffect, useState } from "react";
import { Form, Input, Select, FormItemProps, Spin, Switch } from "antd";

export const PreserveForm = () => {
  const [form] = Form.useForm();

  const displayAge = Form.useWatch("displayAge", form);

  return (
    <div style={{ padding: 20, background: "#eee" }}>
      <Form
        form={form}
        layout="inline"
        // 控制当前表单是否保留数据，比如age卸载后，下次再展示是否保留上一次的数据
        preserve={false}
        onFinish={(values) => {
          console.log("submit", values);
        }}
      >
        <Form.Item label="是否展示年龄" name="displayAge">
          <Switch style={{width: 50}} />
        </Form.Item>
        {displayAge && (
          <Form.Item label="age" name="age">
            <input type="number" />
          </Form.Item>
        )}
        <Form.Item label="name" name="name">
          <input />
        </Form.Item>
        <div style={{ marginLeft: "auto" }}>
          <button type="submit">Submit</button>
        </div>
      </Form>
    </div>
  );
};
