import { useEffect, useState, useMemo, useCallback } from "react";
import { useCount } from "./hooks/useCount";
import { usePriceValue ,getPriceAtom } from "./hooks/usePrice";

export const Price = () => {
  const [count, setCount] = useCount();
  const price = usePriceValue()

  const getPrice = useCallback(() => {
    console.log("price", price);
  }, [price]);
  


  return (
    <div>
      {/* <button onClick={() => setCount(count + 1)}>+</button> */}
      <span>price: {price}</span>
    </div>
  );
};
