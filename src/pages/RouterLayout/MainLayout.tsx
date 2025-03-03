import React, { PropsWithChildren } from "react";
import { Menu } from "./Components/Menu";

import styles from "./MainLayout.module.less";

export const MainLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.menu}>
        <Menu></Menu>
      </div>
      <div className={styles.mainContent}>{children}</div>
    </div>
  );
};
