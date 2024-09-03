import { Outlet, NavLink } from 'react-router-dom'
import './index.scss'

interface IRouter {
  name: string
  path: string
  Component: React.ComponentType | null
}

interface IProps {
  title?: string
  routers: Array<IRouter>
}

const navigation = function (props: IProps) {
  const routers = props.routers
  return (
    <div className='navigation-container'>
      <div className='navigation-aside'>
        <h2 className='navigation-title'>{props.title||'Hooks'}</h2>
        <div className='navigation-menu'>
          <ul>
            {routers.map((item) => {
              const { name, path } = item
              return (
                <li key={name}>
                  <NavLink to={path} className={({ isActive }) =>isActive ? "active" : ""}>{name}</NavLink>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
      <div className='navigation-content'>
        <Outlet />
      </div>
    </div>
  )
}

export default navigation
