import { useCallback } from "react";
import { motion, useAnimationControls } from "framer-motion";

const btnStyle = {
  color: "white",
  fontFamily: "system-ui",
  backgroundColor: "black",
  padding: 10,
  paddingLeft: 32,
  paddingRight: 32,
  letterSpacing: 1,
  borderRadius: 20,
  cursor: "pointer",
  whiteSpace: "nowrap",
};

export const MotionAnimationControls = () => {
  const controller = useAnimationControls();
  console.log(controller);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 52,
      }}
    >
      <motion.div
        style={{
          width: 100,
          height: 100,
          backgroundColor: "white",
          borderRadius: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "system-ui",
        }}
        variants={{
          rotation: {
            rotate: 540,
          },
          set: { rotate: 0 },
        }}
        transition={{ duration: 3, ease: "linear" }}
        animate={controller}
      >
        hellocode
      </motion.div>
      <div
        style={{
          display: "flex",
          gap: 20,
        }}
      >
        <div
          style={btnStyle}
          onClick={() => {
            controller.start("rotation");
          }}
        >
          start
        </div>
        <motion.div
          style={btnStyle}
          onTap={async ()=>{
            await controller.start({x:100})
            await controller.start({y:-200})
            await controller.start({x:-100})
            controller.start({y:0})
          }}
          >start2</motion.div>
        <motion.div
          style={btnStyle}
          onTap={() => {
            controller.stop();
          }}
        >
          stop
        </motion.div>
        <motion.div
          style={btnStyle}
          onTap={() => {
            controller.set("set");
          }}
        >
          set
        </motion.div>
      </div>
    </div>
  );
};
