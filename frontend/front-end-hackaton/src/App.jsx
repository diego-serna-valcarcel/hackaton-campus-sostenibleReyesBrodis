import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './css/App.css'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import ContainersPage from './pages/ContainersPage'
import SignUpPage from './pages/SignUpPage'
import PasswordRecover from './pages/PasswordRecover'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/containers" element={<ContainersPage />}/>
      <Route path="/register" element={<SignUpPage />} />
      <Route path="/recover-password" element={<PasswordRecover />} />
    </Routes>
  )
}

export default App
