import { useEffect, useState, useMemo } from 'react'
import {Count} from "./Count"
import {Price} from "./Price"
import { Pay} from "./Pay"
import { useCountValue } from "./hooks/useCount";

function Exp1() {
  const count = useCountValue()



  return (
    <div>
      <Count></Count>
      <Price></Price>
      <Pay></Pay>
      <div>state count: {count}</div>
      {/* <div>state count: {price}</div> */}
      
    </div>
  )
}

export default Exp1
