import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Pages/login'
import Register from './Pages/Register'
import Dashboard from './Dashboard/Dashboard'




const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}/>          
          <Route path="/Login" element={<Login/>}/>
          <Route path="/Register" element={<Register/>}/>
           <Route path="/Dashboard" element={<Dashboard/>}/>        
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
