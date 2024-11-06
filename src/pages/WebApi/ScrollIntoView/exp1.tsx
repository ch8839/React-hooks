import { Flex } from "antd";
import React, { useRef } from "react";

export const Exp1 = (props: any) => {
  const firstCatRef = useRef<HTMLImageElement>(null);
  const secondCatRef = useRef<HTMLImageElement>(null);
  const thirdCatRef = useRef<HTMLImageElement>(null);

  const handleScrollToFirstCat = () => {
    firstCatRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  };

  const handleScrollToSecondCat = () => {
    secondCatRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  };

  const handleScrollToThirdCat = () => {
    thirdCatRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  };

  return (
    <div>
      <nav>
        <button onClick={handleScrollToFirstCat}>Neo</button>
        <button onClick={handleScrollToSecondCat}>Millie</button>
        <button onClick={handleScrollToThirdCat}>Bella</button>
      </nav>
      <div style={{width: "400px", overflow: "hidden"}}>
        <ul style={{display: "flex", gap: 20, listStyle: "none" }}>
          <li>
            <img
              src="https://placecats.com/neo/300/200"
              alt="Neo"
              ref={firstCatRef}
            />
          </li>
          <li>
            <img
              src="https://placecats.com/millie/200/200"
              alt="Millie"
              ref={secondCatRef}
            />
          </li>
          <li>
            <img
              src="https://placecats.com/bella/199/200"
              alt="Bella"
              ref={thirdCatRef}
            />
          </li>
        </ul>
      </div>
    </div>
  );
};
