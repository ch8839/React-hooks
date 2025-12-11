import { useCallback, useState } from "react";
import { motion } from "framer-motion";

export const MotionBase = () => {
  const [isRotated, setRotate] = useState(false);
  const [downloadStep, setDownloadStep] = useState(10);
  const handleRotate = useCallback(() => {
    setRotate(!isRotated);
  }, [isRotated]);

  const handleDownloadStep = useCallback(() => {
    setDownloadStep((prev) => prev + 10);
  }, []);

  return (
    <div>
      {/* 页面加载的时候，该元素就发生变化 */}
      {/* <motion.div
      style={{
        width: 100,
        height: 100,
        backgroundColor: "white",
        borderRadius: "20px",
        // motion提供的方便元素变化的便捷属性，在motion组件里面才会生效
        // 相当于transform: translateX(10px) translateY(10px) scale(2);
        x:10,
        y:10,
        scale:2,
        rotate:0
      }}
      animate={{
        x: 50, // 向右移动50px
        y: 20, // 向下移动20px
        scale: 0.5, // 缩放至0.5倍
        rotate: 45, // 旋转45度
        opacity: 0.5, // 不透明度设置为0.5
      }}
    ></motion.div> */}
      <motion.div
        style={{
          width: 100,
          height: 100,
          backgroundColor: "white",
          borderRadius: "20px",
        }}
        // 设置一个元素的初始状态,跟style会有些类似,主要更加直观看到需要变化的属性
        // 除非传false，那么动画就不会生效，直接在加载后显示成animate传入的状态
        initial={{
          x: 10,
          y: 10,
          scale: 1,
          rotate: 0,
        }}
        animate={{
          x: 50,
          y: 20,
          scale: 0.5,
          rotate: 45,
          opacity: 0.5,
          // 在动画信息对象中设置的transition优先级是最高
          // 可以分别设置animate和exit时的transition
          // transition:{
          //   delay:2
          // },
          // transitionEnd: {
          //   backgroundColor: "rgb(8, 126, 164)",
          // },
        }}
        transition={{
          duration: 3,
          delay: 2,
        }}
      ></motion.div>
      <br />
      <br />

      {/* 条件触发动效 */}
      <button onClick={handleRotate}>rotate</button>
      {/* 传统方式 */}
      <div
        style={{
          width: 100,
          height: 100,
          backgroundColor: "white",
          borderRadius: "20px",
          transition: "all 0.5s",
          transform: `rotate(${isRotated ? 45 : 0}deg) scale(${
            isRotated ? 0.5 : 1
          })`,
        }}
      ></div>

      <motion.div
        style={{
          width: 100,
          height: 100,
          backgroundColor: "white",
          borderRadius: "20px",
        }}
        initial={{
          x: 10,
          y: 10,
          scale: 1,
          rotate: 0,
          opacity: 1,
        }}
        animate={{
          x: 50,
          y: 20,
          scale: isRotated ? 0.5 : 1,
          rotate: isRotated ? 45 : 0,
          opacity: isRotated ? 0.5 : 1,
        }}
        transition={{
          duration: 0.5,
        }}
      ></motion.div>
      <br />
      <br />
      {/* 进度条 */}
      <button onClick={handleDownloadStep}>add</button>
      <motion.div
        style={{
          height: 20,
          backgroundColor: "white",
          borderRadius: "20px",
        }}
        initial={{
          width: 10,
        }}
        animate={{
          width: `${downloadStep}%`,
        }}
      ></motion.div>
    </div>
  );
};
