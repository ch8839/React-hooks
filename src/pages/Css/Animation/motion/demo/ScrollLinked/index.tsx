import {
  animate,
  motion,
  MotionValue,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { useRef } from "react";
import "./index.scss";

export const ScrollLinked = () => {
  const ref = useRef(null);
  const { scrollXProgress, scrollYProgress } = useScroll({ container: ref });
  const maskImage = useScrollOverflowMask(scrollXProgress);

  return (
    <div id="example">
      <svg id="progress" width="80" height="80" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="30" pathLength="1" className="bg" />
        <motion.circle
          cx="50"
          cy="50"
          r="30"
          className="indicator"
          style={{ pathLength: scrollYProgress }}
        />
      </svg>
      {/* <motion.ul ref={ref} style={{ display: "flex", flexDirection: "column" }}  className="scroll-container">
              <li style={{ background: "#ff0088" }}></li>
              <li style={{ background: "#dd00ee" }}></li>
              <li style={{ background: "#9911ff" }}></li>
              <li style={{ background: "#0d63f8" }}></li>
              <li style={{ background: "#0cdcf7" }}></li>
              <li style={{ background: "#8df0cc" }}></li>
          </motion.ul> */}

      <motion.div
        ref={ref}
        style={{ maxHeight: "500px", height:"auto", overflow: "auto" }}
        className="scroll-container"
      >
        <div style={{ background: "#ff0088" }}></div>
        <div style={{ background: "#dd00ee" }}></div>
        <div style={{ background: "#9911ff" }}></div>
        <div style={{ background: "#0d63f8" }}></div>
        <div style={{ background: "#0cdcf7" }}></div>
        <div style={{ background: "#8df0cc" }}></div>
      </motion.div>
    </div>
  );
};

const left = `0%`;
const right = `100%`;
const leftInset = `20%`;
const rightInset = `80%`;
const transparent = `#0000`;
const opaque = `#000`;
function useScrollOverflowMask(scrollXProgress: MotionValue<number>) {
  const maskImage = useMotionValue(
    `linear-gradient(90deg, ${opaque}, ${opaque} ${left}, ${opaque} ${rightInset}, ${transparent})`
  );

  useMotionValueEvent(scrollXProgress, "change", (value) => {
    if (value === 0) {
      animate(
        maskImage,
        `linear-gradient(90deg, ${opaque}, ${opaque} ${left}, ${opaque} ${rightInset}, ${transparent})`
      );
    } else if (value === 1) {
      animate(
        maskImage,
        `linear-gradient(90deg, ${transparent}, ${opaque} ${leftInset}, ${opaque} ${right}, ${opaque})`
      );
    } else if (
      scrollXProgress.getPrevious() === 0 ||
      scrollXProgress.getPrevious() === 1
    ) {
      animate(
        maskImage,
        `linear-gradient(90deg, ${transparent}, ${opaque} ${leftInset}, ${opaque} ${rightInset}, ${transparent})`
      );
    }
  });

  return maskImage;
}
