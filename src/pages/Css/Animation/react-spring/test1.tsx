import React, { useRef, useState } from "react";
import { useSpring, animated, useTransition } from "@react-spring/web";
import "./test1.less"

export const ReactSpring_test1 = (props: any) => {
  const isEnd = useRef(false);
  // It just returns SpringValues
  const springs = useSpring({
    from: { x: 0, opacity: 1 },
    to: { x: 100, opacity: 0.5 },
  });

  const [springs_event, api] = useSpring(() => ({
    from: { x: 0 },
  }));
  const handleClick = () => {
    // console.log("api.current", api.current)
    const [from, to] = isEnd.current ? [100, 0] : [0, 100];
    // api.start({
    //   from: {
    //     x: from,
    //   },
    //   to: {
    //     x: to,
    //   },
    // });
    // 方法1: 维护一个按钮切换的状态，根据切换状态改变偏移x(动画没结束也可以立即反向)
    // api.start({
    //   to: {
    //     x: to,
    //   },
    // });
    // 方法2：拿到当前偏移值来切换正反向移动
    const x = springs_event.x.get() === 100 ? 0 : 100
    api.start({
      to: {
        x: x,
      },
      // immediate: true
    });
    isEnd.current = !isEnd.current;
  };

  const [isOpen, setIsOpen] = useState(false);
  const handleDialogChange = () => setIsOpen(prev=> !prev);
  const transition = useTransition(isOpen, {
    from: {
      scale: 0,
      opacity: 0,
    },
    enter: {
      scale: 1,
      opacity: 1,
    },
    leave: {
      scale: 0,
      opacity: 0,
    },
  });

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
            ...springs_event,
          }}
        />
      </div>

      <div>
        <button onClick={handleDialogChange}>open</button>
        {transition((style, isOpen) => (
          <div>
            {isOpen && (
              <animated.div className="content" style={style}>
                content
              </animated.div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
