// max-content

import React from "react";

// 文字下划线动效
export const maxContent = () => {
  return (
    <div style={{ width: "150px" }}>
      <div
        style={{ border: "1px solid #000", width: "200px", maxWidth: "200px" }}
      >
        demo哈哈哈哈哈哈哈哈哈哈哈哈哈哈
      </div>
      {/* width为auto，内容排不下容器时会换行，即容器到达父容器的150px会换 */}
      <div style={{ border: "1px solid #000", maxWidth: "200px" }}>
        demo1哈哈哈哈哈哈哈哈哈哈哈哈哈哈
      </div>
      {/* width为max-content，到达max-width才会换 */}
      <div
        style={{
          border: "1px solid #000",
          width: "max-content",
          maxWidth: "200px",
        }}
      >
        demo2哈哈哈哈哈哈哈哈哈哈哈哈哈哈
      </div>
    </div>
  );
};
