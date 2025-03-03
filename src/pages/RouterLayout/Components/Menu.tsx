import React, {
  PropsWithChildren,
} from "react"
import {Link} from "react-router-dom"


export const Menu: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div >   
      <Link to="/react-router/main/app1"><button>App1</button></Link>
      <Link to="/react-router/main/app2"><button>App2</button></Link>  
    </div>
  )
}