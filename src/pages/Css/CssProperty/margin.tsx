import React from "react";

export const MarginDemo = (props: any) => {
  return (
    <div className="margin-demo">
      <div style={{ padding: "8px" }}>
        {/* width: auto 表示默认宽度 = 父元素的 content 区域宽度。 */}
        {/* 负margin会让子元素向左和右各扩展 8px，相当于把 padding 抵消 */}
        <div
          style={{ width: "auto", marginLeft: "-8px", marginRight: " -8px" }}
        >
          子内容
        </div>
      </div>
      <div className="flex">
        <div>111</div>
        <div>222</div>
        <div className="child3">333</div>
      </div>
      <style>
        {`
        .margin-demo {
          > div {
           margin-bottom: 20px;
            border: 1px solid blue;
          }
        }
        .flex {
          display: flex;
          flex-wrap: wrap;
          > div {
            width: 100px;
            height: 100px;
            border: 1px solid red;
          }
        }
        .child3 {
          
          margin-left: auto;
        }
      `}
      </style>
    </div>
  );
};
