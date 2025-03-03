import React, { act, useCallback, useEffect, useMemo, useRef, useState } from "react";
import classNames from "classnames";
import { Props, TabPanelProps, TabValue } from "./types";
import { TabNavItem } from "./TabNavItem";
import { TabBar } from "./TabBar"

interface TabNavProps {
  itemList: TabPanelProps[];
  activeValue: TabValue;
  onChange: (val: TabValue) => void;
}

export const TabNav: React.FC<TabNavProps> = (props) => {
  const { itemList, activeValue, onChange } = props;
  const navsWrapRef = useRef<HTMLDivElement>(null)
  const handleTabItemClick = useCallback(
    (val: TabValue) => {
      console.log(">>>handleTabItemClick", val, activeValue);
      if (val !== activeValue) {
        onChange(val);
      }
    },
    [activeValue]
  );

  const activeIndex = useMemo(()=> {
    return itemList.findIndex(item=> item.value === activeValue)
  }, [activeValue, itemList])
  

  return (
    <div className={classNames("tabs_nav")}>
      {<TabBar activeId={activeIndex} navsWrapRef={navsWrapRef}></TabBar>}
      <div className={classNames("tabs_nav-wrap")} ref={navsWrapRef}>
      {itemList.map((item) => {
        return (
          <TabNavItem
            key={item.value}
            label={item.label}
            isActive={activeValue === item.value}
            onClick={() => handleTabItemClick(item.value)}
          ></TabNavItem>
        );
      })}
      </div>
    </div>
  );
};
