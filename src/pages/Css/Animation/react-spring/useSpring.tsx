import React, { useRef, useState } from "react";
import {
  useSpring,
  useSprings,
  animated,
  useTransition,
} from "@react-spring/web";
import "./test1.less";

export const ReactSpring_useSpring = (props: any) => {
  const isEnd = useRef(false);
  const springs = useSpring({
    from: { x: 0, opacity: 1 },
    to: { x: 100, opacity: 0.5 },
  });

  const [spring_event, api] = useSpring(() => ({
    from: { x: 0, opacity: 0.5 },
  }));

  const springList = Array.from({ length: 5 });
  const [springList_event, api2] = useSprings(springList.length, () => ({
    from: { x: 0, opacity: 0.5 },
  }));

  const handleClick = () => {
    const [x, opacity] = spring_event.x.get() === 100 ? [0, 0.5] : [100, 1];
    api.start({
      to: {
        x: x,
        opacity,
      },
      // loop: true,// 循环动画
      // delay: 1000 // 延迟1秒执行
      // immediate: true // 立即执行
      config: {
        duration: 2000, // 动画执行时间
      },
    });
    isEnd.current = !isEnd.current;
  };

  const handleClick2 = (index: number) => {
    const [x, opacity] =
      springList_event[index].x.get() === 100 ? [0, 0.5] : [100, 1];
      
    api2.start((i) => {
      if (i === index) {
        return {
          to: {
            x: x,
            opacity,
          },
        };
      }
    });
  };

  return (
    <div className="react-spring">
      <div>
        <animated.div
          style={{
            width: 80,
            height: 80,
            background: "#ff6d6d",
            borderRadius: 8,
            ...springs,
          }}
        />
      </div>

      <div>
        <button onClick={handleClick}>移动</button>
        <animated.div
          onClick={handleClick}
          style={{
            width: 80,
            height: 80,
            background: "#ff6d6d",
            borderRadius: 8,
            ...spring_event,
          }}
        />
      </div>

      <div>
        {springList.map((item, index) => (
          <div key={index}>
            <button onClick={() => handleClick2(index)}>移动</button>
            <animated.div
              onClick={() => handleClick2(index)}
              style={{
                width: 80,
                height: 80,
                background: "#ff6d6d",
                borderRadius: 8,
                ...springList_event[index],
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
