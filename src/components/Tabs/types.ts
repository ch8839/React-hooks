import { ReactNode } from "react";
export type TabValue = string | number;

export interface TabPanelProps {
  value: TabValue;
  label: ReactNode;
  destroyOnHide?: boolean; // 选项卡内容隐藏时是否销毁
  style?: React.CSSProperties
  children?:  React.ReactNode;
}

export interface Props {
  value?: TabValue; // 激活的选项卡值，受控模式
  defaultValue?: TabValue; // 激活的选项卡默认值，非受控属性
  list?: Array<TabPanelProps>; // 直接传入TabPanel
  children?: React.ReactNode;
  onChange?: (value: TabValue) => void;
}
