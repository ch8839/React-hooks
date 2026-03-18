import React from "react";
import { Button } from "antd";
import { Trigger } from "./Trigger";
import { FormDemo } from "./FormDemo";

export const ModalForm2 = () => {
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const handClick = () => {
    setTimeout(() => {
      setOpen(true);
    }, 500);
  };
  const handClick2 = () => {
    setTimeout(() => {
      setOpen2(true);
    }, 1000);
  };
  return (
    <div>
      <Button type="primary" onClick={handClick}>Open</Button>
      <Trigger open={open} onCancel={() => setOpen(false)}>
        <FormDemo />
      </Trigger>
      <Button type="primary" onClick={handClick2}>Open2</Button>
      <Trigger open={open2} onCancel={() => setOpen2(false)}>
        <FormDemo />
      </Trigger>
    </div>
  );
};