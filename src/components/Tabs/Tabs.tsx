import React, { useCallback, useEffect, useMemo, useState } from "react";
import classNames from "classnames";

import type { Props, TabValue } from "./types.ts";
import { TabPanel } from "./TabPanel.tsx";
import { TabNav } from "./TabNav.tsx";
import "./style/tabs_test.less";

export const Tabs = React.forwardRef(
  (props: Props, ref: React.Ref<HTMLDivElement>) => {
    const { value: tabValue, defaultValue, list, children, onChange } = props;

    const memoChildren = useMemo<React.ReactNode | React.ReactNode[]>(() => {
      if (!list || list.length === 0) {
        return children;
      }
      return list.map<React.ReactNode>((panelProps) => (
        <TabPanel key={panelProps.value} {...panelProps}></TabPanel>
      ));
    }, [list, children]);

    const itemList = useMemo(() => {
      return (
        React.Children.map(memoChildren, (child) => {
          if (React.isValidElement(child) && child.type === TabPanel) {
            return child.props;
          }
          return null;
        }) || []
      );
    }, [memoChildren]);

    const [value, setValue] = useState<TabValue>(
      defaultValue === undefined && Array.isArray(itemList) && itemList.length
        ? itemList[0].value
        : defaultValue
    );

    const handleChange = useCallback(
      (newVal: TabValue) => {
        if (tabValue === undefined) {
          setValue(newVal);
        }
        onChange?.(newVal);
      },
      [tabValue, onChange]
    );

    useEffect(() => {
      if (tabValue) {
        setValue(tabValue);
      }
    }, [tabValue]);

    const headerNode = useMemo(
      () => (
        <div className={classNames("tabs_header")}>
          <TabNav
            itemList={itemList}
            activeValue={value}
            // tabClick={handleClickTab}
            onChange={handleChange}
          ></TabNav>
        </div>
      ),
      [itemList, value, handleChange]
    );

    return (
      <div className={classNames("tabs")}>
        {headerNode}
        <div>
          {React.Children.map(memoChildren, (child) => {
            if (React.isValidElement(child)) {
              if (child.type === TabPanel) {
                if (child.props?.value === value) return child;
                if (child.props?.destroyOnHide === false) {
                  return (
                    <TabPanel
                      {...child.props}
                      style={{ display: "none" }}
                    ></TabPanel>
                  );
                }
              }
            }

            return null;
          })}
        </div>
      </div>
    );
  }
);
