import { Route, Routes, Navigate } from 'react-router-dom'
import React from 'react'
import Home from './Pages/Home'
import Signup from './Pages/signup'
import Login from './Pages/login'
import HistoryPage from './Pages/History'

function App() {
  const token = localStorage.getItem("jwt");

  return (
    <div>
      <Routes>
        <Route path='/' element ={token?<Home/>:<Navigate to="/login"/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/history' element={<HistoryPage/>}/>
      </Routes>
    </div>
  )
}

export default App
