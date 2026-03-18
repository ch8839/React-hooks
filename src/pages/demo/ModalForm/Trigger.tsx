import React, { createContext, useEffect } from "react";

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

export const Context = createContext<ActionContextProps>({
  open: false,
  onCancel: () => undefined,
  destroy: () => undefined,
});

export const Trigger = (props: TriggerProps) => {
  const { open: openProp, item, onCancel } = props;
  const isControl = openProp !== undefined;
  const [open, setOpen] = React.useState(false);
  const [mount, setMount] = React.useState(false); // 组件是否挂载

  useEffect(() => {
    if (isControl) {
      setOpen(openProp);
      if (openProp) {
        setMount(true);
      }
    }
  }, [openProp]);

  const handleClick = () => {
    setMount(true);
    setOpen(true);
    item?.props.onClick?.();
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
          destroy: () => setMount(false),
        }}
      >
        {mount ? props.children : null}
      </Context.Provider>
    </>
  );
};
