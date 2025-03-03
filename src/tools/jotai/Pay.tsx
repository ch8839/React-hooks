import { useEffect, useState, useMemo, useCallback } from "react";
import { useGetPriceValue } from "./hooks/usePrice";

export const Pay = () => {
  const getPriceValue = useGetPriceValue()

  return (
    <div>
      <button onClick={() => getPriceValue?.()}>去支付</button>
    </div>
  );
};
