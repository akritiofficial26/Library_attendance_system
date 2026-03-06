import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Pages/login'
import Register from './Pages/Register'
import Dashboard from './Dashboard/Dashboard'
import Performance from './Pages/Performance'




const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}/>          
          <Route path="/Login" element={<Login/>}/>
          <Route path="/Register" element={<Register/>}/>
           <Route path="/Dashboard" element={<Dashboard/>}/>
           <Route path="/Performance" element={<Performance/>} />       
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
