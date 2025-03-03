import { useEffect, useState, useMemo, useCallback } from "react";
import dayjs from "dayjs"
export const DayjsExp1 = () => {
  
  const start = new Date()
  const second = dayjs(start).unix() // Unix 时间戳，单位为秒
  const date = dayjs.unix(second) // 将 Unix 时间戳转换为 dayjs 对象
  const format = date.format()

  console.log('>>>start', second, date)
  return (
    <div>
      <p>{format}</p>
    </div>
  );
};
