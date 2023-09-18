import { Home } from './pages/Home/index.tsx'
import * as hooksList from './hooks/index.ts'
import * as reactApiList from './reactApi/index.ts'
import * as componentsList from './components/index.tsx'

import Navigation from './pages/navigation/index.tsx'

console.log('>>>HooksList', hooksList)

export const HooksRouters = Object.keys(hooksList).map((name: string) => {
  const item = (hooksList as any)[name]
  return {
    name,
    path: '/hooks/'+name,
    Component: item
  }
})

export const ApiRouters = Object.keys(reactApiList).map((name: string) => {
  const item = (reactApiList as any)[name]
  return {
    name,
    path: '/react-api/'+name,
    Component: item
  }
})

export const ComponentsRouters = Object.keys(componentsList).map((name: string) => {
  const item = (componentsList as any)[name]
  return {
    name,
    path: '/components/'+name,
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
    path: '/hooks',
    element: <Navigation routers={HooksRouters}></Navigation>,
    children: [...HooksRouters]
    // Component() {
    //   return <h1>about</h1>
    // },
  },
  {
    path: '/react-api',
    element: <Navigation routers={ApiRouters}></Navigation>,
    children: [...ApiRouters]
    // Component() {
    //   return <h1>about</h1>
    // },
  },
  {
    path: '/components',
    element: <Navigation routers={ComponentsRouters}></Navigation>,
    children: [...ComponentsRouters]
  },
 
]
