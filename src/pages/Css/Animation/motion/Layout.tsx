import { useState } from "react";
import { motion } from "framer-motion";

export const MotionLayout = () => {
  const [buttonRight, setButtonState] = useState(false);

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
          width: 180,
          backgroundColor: "#FFFFFF88",
          borderRadius: "60px",
          display: "flex",
          alignItems: "center",
          // 当组件触发重新渲染，渲染后的元素布局发生改变，就会触发子元素相应的变化效果
          justifyContent: buttonRight ? "flex-end" : "flex-start",
          padding: 10,
        }}
        onTap={() => {
          setButtonState(!buttonRight);
        }}
      >
        <motion.div
          // 设置在子元素上
          layout
          style={{
            width: 60,
            height: 60,
            backgroundColor: "white",
            borderRadius: 60,
          }}
        ></motion.div>
      </motion.div>
    </div>
  );
};
