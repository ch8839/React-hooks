import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from "./pages/Home"
import { PageLayout } from "./pages/PageLayout"
import './App.css'



function App() {
  return (
    <div className='App'>
      <BrowserRouter>
            <Routes>
              <Route path="/home" Component={Home} />
              <Route path="/*" Component={PageLayout} />
            </Routes>
            
      </BrowserRouter>
    </div>
  )
}

export default App
