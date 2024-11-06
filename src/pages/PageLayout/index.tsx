import { MenuContainer } from "./Menu"
import { Main } from "./Main"
import './index.scss'

export const PageLayout = function() {
  return (
    <div className="PageLayout">
      <MenuContainer />
      <Main />
    </div>
  )
}