import { Route, Routes, Navigate } from 'react-router-dom'
import React from 'react'
import Home from './Pages/Home'
import Signup from './Pages/signup'
import Login from './Pages/login'
import HistoryPage from './Pages/History'
import AdminDashboard from './Pages/Admin'
import  { Toaster } from 'react-hot-toast';

function App() {
  const token = localStorage.getItem("jwt");

  return (
    <div>
      <Routes>
        <Route path='/' element ={token?<Home/>:<Navigate to="/login"/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/history' element ={token?<HistoryPage/>:<Navigate to="/login"/>}/>
        <Route path='/admin' element ={token?<AdminDashboard/>:<Navigate to="/login"/>}/>
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
