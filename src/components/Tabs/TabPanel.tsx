import React, { useEffect, useMemo, useState } from "react";
import classNames from "classnames";

import type { TabPanelProps } from "./types.ts";

export const TabPanel: React.FC<TabPanelProps> = (props) => {
  return (
    <div className={classNames("tabs_panel")} style={props.style}>
      {props.children}
    </div>
  );
};
