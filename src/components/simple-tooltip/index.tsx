import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from "react";
import styles from "./index.module.less"

interface Props {}
enum Direction {
  left="left",
  right="right",
  top="top",
  bottom="bottom"
}
export const SimpleTooltip: React.FC<Props> = (props) => {
  const direction = Direction.top

  return (
    <div className={`${styles.container} ${styles[direction]}`}>
      
      <span className={styles.text}>SimpleTooltip</span>
     
    </div>
  );
};
