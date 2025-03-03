import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import styles from "./MainLayout.module.less";

export const TopicLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={styles.topicContainer}>
      Topic
    </div>
  );
};
