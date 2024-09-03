import { Home } from './pages/Home/index.tsx'
import * as componentsList from './components/index.tsx'
import * as toolsList from './tools/index.ts'

import Navigation from './pages/navigation/index.tsx'

export const ComponentsRouters = Object.keys(componentsList).map((name: string) => {
  const item = (componentsList as any)[name]
  return {
    name,
    path: '/components/'+name,
    Component: item
  }
})

export const ToolsRouters = Object.keys(toolsList).map((name: string) => {
  const item = (toolsList as any)[name]
  return {
    name,
    path: '/tools/'+name,
    Component: item
  }
})

export const routers = [
  {
    path: '/',
    loader: () => ({ message: 'Hello home Router!' }),
    element: <Home></Home>,
    // Component() {
    //   return 
    // },
  },
  {
    path: '/about',
    loader: () => ({ message: 'Hello about Router!' }),
    Component() {
      return <h1>about</h1>
    },
  },
  {
    path: '/components',
    element: <Navigation routers={ComponentsRouters} title='components'></Navigation>,
    children: [...ComponentsRouters]
  },
  {
    path: '/tools',
    element: <Navigation routers={ToolsRouters} title='tools'></Navigation>,
    children: [...ToolsRouters]
  },
 
]
