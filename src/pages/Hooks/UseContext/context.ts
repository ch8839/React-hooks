import React from "react"

export const GlobalContext  = React.createContext({
  lang: "zh-ch",
  theme: "light"
})

export const useGlobalContext = ()=> {
  return React.useContext(GlobalContext)
}