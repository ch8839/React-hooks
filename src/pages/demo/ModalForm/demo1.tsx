import { Button, Space } from "antd";
import { Trigger } from "./Trigger";
import { FormDemo } from "./FormDemo";

export const ModalForm1 = () => {
  return (
    <Space>
      <Trigger item={<Button type="primary" onClick={() => console.log("open1")}>Open</Button>}>
        <FormDemo />
      </Trigger>

      <Trigger item={<Button type="primary">Open2</Button>}>
        <FormDemo />
      </Trigger>
    </Space>
  );
};