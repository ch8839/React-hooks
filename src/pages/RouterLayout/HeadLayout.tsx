import React, { PropsWithChildren } from "react";

export const BasicLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return <div>{children}</div>;
};
