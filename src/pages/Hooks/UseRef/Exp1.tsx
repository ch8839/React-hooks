import React, { useState, useRef } from "react";

function setupCatList() {
  const catList = [];
  for (let i = 0; i < 10; i++) {
    catList.push("https://loremflickr.com/320/240/cat?lock=" + i);
  }

  return catList;
}

export const Exp1: React.FC<{name: string}> = (props) => {
  const itemsRef = useRef<Map<string, HTMLLIElement> | null>(null);
  const [catList, setCatList] = useState(setupCatList);

  const getMap = () => {
    if (!itemsRef.current) itemsRef.current = new Map<string, HTMLLIElement>();
    return itemsRef.current;
  };

  const scrollToCat = (cat: string) => {
    const map = itemsRef.current;
    const catItem = map?.get(cat);
    catItem?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  };

  return (
    <>
      <nav style={{position:"sticky", top: "0px"}}>
        <button onClick={() => scrollToCat(catList[0])}>Neo</button>
        <button onClick={() => scrollToCat(catList[5])}>Millie</button>
        <button onClick={() => scrollToCat(catList[9])}>Bella</button>
      </nav>
      <div>
        <ul>
          {catList.map((cat) => (
            <li
              key={cat}
              ref={(node) => {
                // 使用 ref 回调管理 ref 列表，将函数传递给 ref 属性
                // 再通过其索引或某种类型的 ID 访问任何 ref
                const map = getMap();
                if (node) {
                  map.set(cat, node);
                } else {
                  map.delete(cat);
                }
              }}
            >
              <img src={cat} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
