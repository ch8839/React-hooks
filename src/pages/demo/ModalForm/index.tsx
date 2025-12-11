import React, { createContext, useEffect } from "react";
import { Button, Modal, Form } from "antd";
import { TriggerType } from "antd/es/color-picker/interface";

interface TriggerProps {
  open?: boolean;
  item?: React.ReactElement;
  children: React.ReactNode;
  onCancel?: () => void;
}

interface ActionContextProps {
  open: boolean;
  onCancel: () => void;
  destroy: () => void;
}

const Context = createContext<ActionContextProps>({
  open: false,
  onCancel: () => undefined,
  destroy: () => undefined,
});

const Trigger = (props: TriggerProps) => {
  const { open: openProp, item, onCancel } = props;
  const isControl = openProp !== undefined;
  const [open, setOpen] = React.useState(false);
  const [load, setLoad] = React.useState(false); // 组件是否加载

  useEffect(() => {
    if (isControl) {
      setOpen(openProp);
      if (openProp) {
        setLoad(true);
      }
    }
  }, [openProp]);

  const handleClick = () => {
    setLoad(true);
    setOpen(true);
  };

  return (
    <>
      {React.isValidElement(item)
        ? React.cloneElement(item, {
            onClick: handleClick,
          } as any)
        : null}
      <Context.Provider
        value={{
          open,
          onCancel: () => {
            onCancel?.();
            if (!isControl) {
              setOpen(false);
            }
          },
          destroy: () => setLoad(false),
        }}
      >
        {load ? props.children : null}
      </Context.Provider>
    </>
  );
};

const FormDemo = () => {
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

export const ModalForm1 = () => {
  return (
    <div>
      <Trigger item={<Button type="primary">Open</Button>}>
        <FormDemo />
      </Trigger>
    </div>
  );
};

export const ModalForm2 = () => {
  const [open, setOpen] = React.useState(false);
  const handClick = () => {
    setTimeout(() => {
      setOpen(true);
    }, 1000);
  };
  return (
    <div>
      <Button type="primary" onClick={handClick}>Open</Button>
      <Trigger open={open} onCancel={() => setOpen(false)}>
        <FormDemo />
      </Trigger>
    </div>
  );
};
