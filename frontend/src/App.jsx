import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Pages/login'
import Register from './Pages/Register'
import AuthPage from './Pages/AuthPage'


const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/Login" element={<Login/>}/>
          <Route path="/Register" element={<Register/>}/>
          <Route path="/AuthPage" element={<AuthPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
