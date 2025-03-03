import React, { useRef, useState } from "react";
import { useSpring, animated, useScroll } from "@react-spring/web";
import "./test1.less";
import { Width } from "../../CssProperty";

export const ReactSpring_scrollDemo = (props: any) => {
  const containerRef = React.useRef<HTMLDivElement>(null!);
  const [textSprings, textApi] = useSpring(() => ({ y: "100%", opacity: 0 }));
  const [dotSprings, dotApi] = useSpring(() => ({
    from: { width: 0, height: 0 },
  }));
  const [barSprings, barApi] = useSpring(() => ({
    from: { width: 0 },
  }));

  const { scrollYProgress } = useScroll({
    container: containerRef,
    onChange: ({ value: { scrollYProgress } }) => {
      console.log(">>>onChange", scrollYProgress);
      dotApi.start({
        to: {
          width: scrollYProgress * 100,
          height: scrollYProgress * 100,
        },
      });

      const containerWidth = getComputedStyle(
        containerRef.current
      ).width.replace("px", "");

      barApi.start({
        to: {
          width: scrollYProgress * Number(containerWidth),
        },
        immediate: true
      });

      if (scrollYProgress > 0.7) {
        textApi.start({ y: "0", opacity: 1 });
      } else {
        textApi.start({ y: "100%", opacity: 0 });
      }
    },
  });

  console.log(">>>scrollYProgress", scrollYProgress);

  return (
    <div className="react-spring-scroll-demo" ref={containerRef}>
      <animated.div className="bar-container" style={barSprings}></animated.div>
      <div className="dot-container">
        <animated.div className="dot" style={dotSprings}></animated.div>
      </div>

      <div className="text">
        <animated.div
          style={{
            color: "red",
            fontSize: "20px",
            ...textSprings,
          }}
        >
          <p>hello</p>
        </animated.div>
      </div>
    </div>
  );
};
