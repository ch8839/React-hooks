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
    action: {
      width: "50px",
      height: "80px",
      marginLeft: "8px",
      color: "rgba(0, 0, 0, 0.2)",
      fontSize: "24px",
      verticalAlign: "middle",
      cursor: "pointer",
      transition: "color 0.3s",
      "&:hover": {
        color: "red",
      },
    },
  };
});

const JsCss: React.FC<Props> = (props) => {
  // const { styles } = useStyles();
  return (
    <div>
      <div>
        <div>123</div>
      </div>
    </div>
  );
};

export default JsCss;
