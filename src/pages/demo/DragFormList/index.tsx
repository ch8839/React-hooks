import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { ReactSortable } from "react-sortablejs";

export const SortableFormList = () => {
  const [form] = Form.useForm();
  const [order, setOrder] = useState<number[]>([]);

  return (
    <Form form={form} initialValues={{ users: [{}] }}>
      <Form.List name="users">
        {(fields, { add, remove, move }) => {
          console.log("fields", fields);
          if (order.length !== fields.length) {
            setOrder(fields.map(f => f.key));
          }
          return (
            <>
              <ReactSortable
                list={order.map((id) => ({ id }))}
                setList={(newOrder) => {
                  const oldFields = fields.slice();
                  const newKeys = newOrder.map((item) => item.id);
                  newKeys.forEach((id, index) => {
                    const oldIndex = oldFields.findIndex((f) => f.key === id);
                    if (oldIndex !== -1 && oldIndex !== index) {
                      move(oldIndex, index);
                    
                    }
                  });
                  
                  setOrder(newKeys);
                }}
              >
                {order.map((id) => {
                  const field = fields.find((f) => f.key === id);
                  if (!field) return null;
                  const { key, name, ...restField } = field;
                  return (
                  <div key={key} style={{ marginBottom: 8, background: "#fafafa", padding: 16, border: "1px solid #ddd", borderRadius: 4 }}>
                    <Form.Item
                     
                      label={`用户 ${field.key + 1}`}
                      name={[name, "name"]}
                      rules={[{ required: true, message: "请输入姓名" }]}
                    >
                      <Input placeholder="姓名" />
                    </Form.Item>
                    <Button danger onClick={() => remove(name)} style={{ marginBottom: 12 }}>
                      删除
                    </Button>
                  </div>
                )})}
              </ReactSortable>
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => {
                    add();
                  }}
                  block
                >
                  新增用户
                </Button>
              </Form.Item>
            </>
          );
        }}
      </Form.List>
    </Form>
  );
};
