import React, { useRef, useState } from "react";
import { useSpring, useTransition, animated } from "@react-spring/web";

export const useTransiton = () => {
  const [items, setItems] = useState<number[]>([1, 2, 3]);
  const count = useRef(items.length);

  const transitions = useTransition(items, {
    from: { opacity: 0, transform: "translateX(-20px)", height: 0, padding: 0}, // 初始状态
    enter: { opacity: 1, transform: "translateX(0px)", height: 60, padding: 5}, // 进入动画
    leave: { opacity: 0, transform: "translateX(-20px)",  height: 0, padding: 0}, // 离开动画
    config: { duration: 300 }, // 添加动画持续时间
    keys: (item) => item, // 提供唯一 key，提升性能
  });

  const addItem = () => {
    count.current++;
    setItems((prev) => [...prev, Math.floor(count.current)]);
  };

  const removeItem = (itemToRemove: number) => {
    setItems((prev) => prev.filter((item) => item !== itemToRemove));
  };

  return (
    <div>
      <button onClick={addItem}>Add Item</button>
      <div style={{ marginTop: "20px", position: "relative", transition:"all 0.3s" }}>
        {transitions((styles, item) => (
          <animated.div
            key={item}
            style={{
              ...styles,
              marginTop: "10px",
              boxSizing:"border-box",
              background: "lightblue",
              borderRadius: "4px",
            }}
          >
            <span>Item {item}</span>
            <button
              style={{ marginLeft: "10px" }}
              onClick={() => removeItem(item)}
            >
              Remove
            </button>
          </animated.div>
        ))}
      </div>
    </div>
  );
};
