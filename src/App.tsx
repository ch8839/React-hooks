import React from 'react'
import {
  createBrowserRouter,
  RouterProvider,
  useLoaderData,
} from 'react-router-dom'

import './App.css'

import { routers } from './routers'

const Router = createBrowserRouter(routers)

function App() {
  return (
    <div className='App'>
      <RouterProvider router={Router} fallbackElement={<p>Loading...</p>} />
    </div>
  )
}

export default App
