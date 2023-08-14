import { useState, useContext } from "react"
import './index.scss'

import Exp1 from './exp1'
import Exp2 from './exp2'



export default function UseContextExp() {
  
  return (
    <div>
      <h2>Exp1</h2>
      <Exp1></Exp1>

      <h2>Exp2</h2>
      <Exp2></Exp2>
    </div>
  )
}