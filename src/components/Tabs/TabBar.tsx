import React, { useCallback, useEffect, useMemo, useState } from "react";
import classNames from "classnames";

interface TabBarProps {
  activeId: number;
  navsWrapRef: React.RefObject<HTMLDivElement>;
  children?: React.ReactNode;
}

export const TabBar: React.FC<TabBarProps> = (props) => {
  const { activeId, navsWrapRef } = props;
  const [barStyle, setBarStyle] = useState<React.CSSProperties>({});

  const computeStyle = useCallback(() => {
    let offset = 0;
    let width = "";
    const itemsRef = navsWrapRef.current?.querySelectorAll(".tabs_nav-item");
    if (itemsRef && itemsRef.length > activeId) {
      itemsRef?.forEach((item, itemIndex) => {
        if (itemIndex < activeId) {
          offset += Number(getComputedStyle(item).width.replace("px", ""));
        }
        if (itemIndex === activeId) {
          width = getComputedStyle(item).width;
        }
      });

      setBarStyle({ transform: `translateX(${offset}px)`, width: width });
    }
  }, [navsWrapRef.current, activeId]);

  useEffect(() => {
    if (navsWrapRef.current) {
      setTimeout(() => computeStyle());
    }
  }, [navsWrapRef.current, computeStyle]);
  return <div className={classNames("tabs_bar")} style={barStyle}></div>;
};
