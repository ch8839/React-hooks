import React, { useEffect, useState } from "react";
import { Form, Input, Select, FormItemProps, Spin } from "antd";

const fetchData = (mock: any) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mock);
    }, 100);
  });
};

export const InitialValues = () => {
  const [form] = Form.useForm();
  const [initialValues, setInitialValues] = useState<any>();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchData({
      username: "John",
      age: 30,
    }).then((data) => {
      setInitialValues(data);
      // setTimeout(() => {
      //   form.resetFields(); // 执行 resetFields 刷新 initialValues
      // }, 0);
      
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    // 当 请求到数据后loading 为 false 时，重置表单初始值
    if (!loading) {
      form.resetFields();
    }
  }, [loading, form]);
  
  return (
    <div style={{ padding: 20, background: "#eee" }}>
      <Spin spinning={loading}>
        {
          <Form
            form={form}
            initialValues={initialValues}
            onFinish={(values) => {
              console.log("submit", values);
            }}
          >
            <Form.Item label="Username" name="username">
              <input />
            </Form.Item>
            <Form.Item label="Age" name="age">
              <input type="number" />
            </Form.Item>
            <Form.Item>
              <button>Submit</button>
            </Form.Item>
          </Form>
        }
      </Spin>
    </div>
  );
};
