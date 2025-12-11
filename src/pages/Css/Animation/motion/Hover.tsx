import { useCallback } from "react";
import { motion } from "framer-motion";

export const MotionHover = () => {
  return (
    <motion.div
      style={{
        width: 100,
        height: 100,
        backgroundColor: "white",
        borderRadius: "20px",
      }}
      // 以下三个属性
      // 是motion组件提供的能力

      // 鼠标悬浮时
      whileHover={{
        rotate: 45,
        scale: 1.2,
      }}
      // 鼠标按住时
      whileTap={{
        opacity: 0.5,
        scale: 0.5,
      }}
      // 让元素可以随意拖拽
      drag
      // 元素放手后会自动回到起始点
      dragSnapToOrigin
    ></motion.div>
  );
};
