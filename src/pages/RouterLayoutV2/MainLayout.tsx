import React, { PropsWithChildren } from "react";
import { Outlet } from "react-router-dom";
import { Menu } from "./Components/Menu";

import styles from "./MainLayout.module.less";

export const MainLayout: React.FC<PropsWithChildren> = () => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.menu}>
        <Menu></Menu>
      </div>
      <div className={styles.mainContent}>
        <Outlet></Outlet>
      </div>
    </div>
  );
};
