import { useState, useRef } from "react";
import "./Exp4.scss";

export const CatFriends = () => {
  const [index, setIndex] = useState(0);
  const catRef = useRef<any>(null);
  return (
    <>
      <nav>
        <button
          onClick={() => {
            let newIndex = 0;

            if (index < catList.length - 1) {
              newIndex = index + 1;
            }
            catRef.current?.childNodes[newIndex]?.scrollIntoView({
              behavior: "smooth",
              block: "nearest",
              inline: "center",
            });
            setIndex(newIndex);
          }}
        >
          下一个
        </button>
      </nav>
      <div>
        <ul ref={catRef} style={{ display: "flex", listStyle: "none", width: "500px", overflow: "hidden" }}>
          {catList.map((cat, i) => (
            <li key={cat.id} style={{padding: "10px"}}>
              <img
                className={index === i ? "active-cat" : ""}
                src={cat.imageUrl}
                alt={"猫猫 #" + cat.id}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

const catList: any = [];
for (let i = 0; i < 10; i++) {
  catList.push({
    id: i,
    imageUrl: "https://loremflickr.com/250/200/cat?lock=" + i,
  });
}
