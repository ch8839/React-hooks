import { useCallback } from "react";
import { motion } from "framer-motion";

const animations = {
  show: {
    opacity: 1,
  },
  hidden: {
    opacity: 0,
  },
};

const list = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const item = {
  visible: { opacity: 1, x: 0 },
  hidden: { opacity: 0, x: -100 },
};

export const MotionVariants = () => {
  const data = [1, 2, 3, 4, 5];

  return (
    <div>
      <motion.div
        style={{
          width: 100,
          height: 100,
          backgroundColor: "white",
          borderRadius: "20px",
        }}
        transition={{
          duration: 2,
        }}
        variants={animations} // 设定多个动画状态的对象
        initial={"hidden"}
        animate={"show"} // 在animate属性中传入某个状态的名称
      ></motion.div>

      {/* 父元素使用相应的状态名称进行变化，子元素会自动触发动画同名状态的变化，不需要通过animate传入状态名称 */}
      <motion.ul initial="hidden" animate="visible" variants={list}>
        <motion.li variants={item}>111</motion.li>
        <motion.li variants={item}>222</motion.li>
        <motion.li variants={item}>333</motion.li>
      </motion.ul>

      {/* 动态传值 */}
      <motion.ul initial="hidden" animate="visible" variants={list}>
        {data.map((item, index) => (
          <motion.li
            key={item}
            initial={{ opacity: 0, x: -100 }}
            animate={{
              opacity: 1,
              x: 0,
              transition: {
                delay: (index+1) * 0.2,
              },
            }}
          >
            {item}
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
};
