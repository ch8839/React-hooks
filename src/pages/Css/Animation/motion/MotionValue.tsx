import { useCallback } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

export const MotionUseMotionValue = () => {
  const radiusMV = useMotionValue(0); // 追踪元素变化状态的一种类型数据

  const radius = useTransform(radiusMV, [-200, 200], [10, 40]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <motion.div
        style={{
          width: 100,
          height: 100,
          backgroundColor: "white",
          borderRadius: radius,
        }}
      ></motion.div>
      <motion.div
        style={{
          x: radiusMV,
          height: 20,
          width: 6,
          borderRadius: 2,
          backgroundColor: "white",
          y: 20,
        }}
        drag="x"
        dragMomentum={false}
      ></motion.div>
      <motion.span
        style={{
          y: 30,
          letterSpacing: 2,
          color: "white",
          opacity: 0.3,
        }}
      >
        左右拖动我
      </motion.span>
    </div>
  );
};
