import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from "react";
import { createStyles } from "antd-style";

interface Props {}

const useStyles = createStyles(({ token }) => {
  return {
    container: {
      // width: "500px",
      // height: "200px",
      // border: "1px solid white",
    },
    action: {
      width: "50px",
      height: "80px",
      border: "1px solid white",
      color: "blue",
      fontSize: "24px",
      cursor: "pointer",
      transition: "color 0.3s",
      "&:hover": {
        color: "red",
      },
    },
    style2: {
      width: "400px",
      height: "100px",
      border: "1px solid white",
    },
    style2_div: {
      width: "300px",
      height: "100px",
      padding: "10% 50%", // 子元素的padding百分比取决于父元素的width，跟自身和父元素高度无关，计算结果是40px 200px
      border: "1px solid red",
    },
  };
});

export const JsCss: React.FC<Props> = (props) => {
  const { styles } = useStyles();
  return (
    <div className={styles.container}>
      <div className={styles.action}>
        <div>123</div>
      </div>

      <div className={styles.style2}>
        <div className={styles.style2_div}>style2</div>
      </div>
    </div>
  );
};
