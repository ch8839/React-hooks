import React, { PropsWithChildren, useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu } from "./Components/Menu";

import styles from "./MainLayout.module.less";
const mockRequest = (delay = 1000) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, delay);
  });
};

export const MainLayout: React.FC<PropsWithChildren> = () => {
  const location = useLocation();
  const [ready, setReady] = useState(false);
  useEffect(() => {
    console.log('>>>location.pathname change', location.pathname)
    setReady(false);
    mockRequest().then(() => {
      setReady(true);
    });
  }, [location.pathname]);
  return (
    <div className={styles.mainContainer}>
      <div className={styles.menu}>
        <Menu></Menu>
      </div>
      <AnimatePresence mode="wait">
        {/* <motion.div
          key={location.pathname}
          initial={{ opacity: 0, x: 0 }}
          animate={{ opacity: 1, x: 20 }}
          // exit={{ opacity: 0, x: 0 }}
        >
          <Outlet />
        </motion.div> */}

        <motion.div
          key={location.pathname}
          // filter: 'blur(8px)' 是 CSS 滤镜效果中的高斯模糊效果。8px 表示模糊半径
          initial={{ opacity: 0, scale: 0.9, filter: "blur(8px)" }}
          animate={{
            opacity: ready ? 1 : 0,
            scale: ready ? 1 : 0.9,
            filter: ready ? "blur(0px)" : "blur(8px)",
          }}
          transition={{ duration: 0.4 }}
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
