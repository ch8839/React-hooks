import React from "react";

export const Width = (props: any) => {
  return (
    <>
      {/* auto宽度会默认填满其包含块（父容器）的宽度，减去任何 padding 和 margin */}
      <div style={{ border: "1px solid white", width: "300px" }}>
        <div
          style={{ border: "1px solid blue", padding: "50px", width: "auto" }}
        >
          auto width
        </div>
      </div>

      {/* 对于content盒模型，如果设置了padding，再设置width为100%时， width以父容器宽度为参照，此时width会溢出父容器*/}
      <div style={{ border: "1px solid white", width: "300px" }}>
        <div
          style={{ border: "1px solid blue", padding: "50px", width: "100%" }}
        >
          100% width
        </div>
      </div>

      <div
        style={{ border: "1px solid white", width: "300px", height: "300px" }}
      >
        {/*  高度由内容高度自动决定，加上 padding 和 border 的高度*/}
        <div
          style={{ border: "1px solid blue", padding: "50px", height: "auto" }}
        >
          <div>auto height</div>
        </div>
      </div>

      <div
        style={{
          margin: "150px 0",
          border: "1px solid white",
          width: "300px",
          height: "300px",
        }}
      >
        {/* 高度会溢出，因为100%是内容高度，加上padding会超出父容器 */}
        <div
          style={{ border: "1px solid blue", padding: "50px", height: "100%" }}
        >
          100% height
        </div>
      </div>

      <div
        style={{ border: "1px solid white", width: "300px", height: "300px" }}
      >
        {/* 解决方法1: 用 calc 减去 padding */}
        <div
          style={{
            border: "1px solid blue",
            padding: "50px",
            height: "calc(100% - 100px)",
          }}
        >
          100% height
        </div>
      </div>

      <div
        style={{ border: "1px solid white", width: "300px", height: "300px" }}
      >
        {/* 解决方法2: 用 border-box盒模型 */}
        <div
          style={{
            border: "1px solid blue",
            boxSizing: "border-box",
            padding: "50px",
            height: "100%",
          }}
        >
          100% height
        </div>
      </div>
    </>
  );
};
