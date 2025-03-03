import React, { PropsWithChildren } from "react";
import { Link, Outlet } from "react-router-dom";
import styles from "./BasicLayout.module.less";

export const BasicLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={styles.basicContainer}>
      <div className={styles.header}>
        <Link to="/react-router-v2">
          <button>index</button>
        </Link>
        <Link to="/react-router-v2/topic">
          <button>topic</button>
        </Link>
      </div>
      <div className={styles.main}>
        <Outlet></Outlet>
      </div>
    </div>
  );
};
