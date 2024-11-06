import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from "react";
import { initialTravelPlan } from "./data";
export const Tree = ({ place }: any) => {
  const [plan, setPlan] = useState(initialTravelPlan);
  const root = plan[0];

  const handleDelete = (parentId: number, id: number) => {
    console.log(parentId, id);
    const parent = plan[parentId];
    const newParent = {
      ...parent,
      childIds: parent.childIds.filter((item) => item !== id),
    };
    setPlan({
      ...plan,
      [parentId]: newParent,
    });
    // setPlan(prev => {
    //   const parentItem = prev[parentId].childIds
    //   const index = parentItem.findIndex(item=> item === id)
    //   parentItem.splice(index, 1)

    //   return prev
    // })
  };

  return root.childIds.map((item) => {
    return (
      <PlaceTree
        key={item}
        id={item}
        parentId={0}
        plan={plan}
        onDelete={handleDelete}
      ></PlaceTree>
    );
  });
};

const PlaceTree = ({ id, parentId, plan, onDelete }: any) => {
  const treeItem = plan[id];
  const handleClick = () => {
    onDelete(parentId, id);
  };

  return (
    <li style={{padding: "10px"}}>
      <div>
        {treeItem.title || ""}
        <button onClick={handleClick}>delete</button>
      </div>
      {!!treeItem.childIds.length && (
        <ol>
          {treeItem.childIds.map((item: number) => {
            return (
              <PlaceTree
                key={item}
                id={item}
                parentId={id}
                plan={plan}
                onDelete={onDelete}
              ></PlaceTree>
            );
          })}
        </ol>
      )}
    </li>
  );
};
