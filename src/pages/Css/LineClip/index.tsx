import React from "react";

export const LineClip = (props: any) => {
  const rows = 3
  return (
    <div>
      <div style={{
        width: "200px",
        border: "1px solid white",
        lineHeight: "16px",
        maxHeight: `${rows * 16}px`,
        overflow: "hidden"
      }}>
        Ant Design, a design language for background applications, is refined by
        Ant UED Team. Ant Design, a design language for background applications,
        is refined by Ant UED Team. Ant Design, a design language for background
        applications, is refined by Ant UED Team. Ant Design, a design language
        for background applications, is refined by Ant UED Team. Ant Design, a
        design language for background applications, is refined by Ant UED Team.
        Ant Design, a design language for background applications, is refined by
        Ant UED Team.
      </div>
    </div>
  );
};
