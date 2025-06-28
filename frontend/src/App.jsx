import React, { Component, useEffect } from 'react'
import {Navbar} from "./components/Navbar.jsx";
import { Routes,Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import SettingsPage from './pages/SettingsPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import { useAuthStore } from './store/useAuthStore.js';
import { LoaderCircle  } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import { useThemeStore } from './store/useThemeStore.js';


const App = () => {
  const {authUser,checkAuth,isCheckingAuth,onlineUsers} = useAuthStore();
  const {theme}=useThemeStore()

  console.log(onlineUsers)
  useEffect(()=>{
    checkAuth()
  },[checkAuth]);

  console.log({checkAuth});
 
  if(isCheckingAuth && !authUser) return(
    <div className='flex items-center justify-center h-screen animate-pulse'>
      <LoaderCircle  className='size-10 animate-spin '/>
    </div>
  )
  
  return (
    <div data-theme={theme}>

      <Navbar/>

      <Routes>
        <Route path='/' element={authUser ? <HomePage/> : <Navigate to="/login" />}  />
        <Route path='/signup' element={!authUser ? <SignUpPage/> :<Navigate to="/" />}  />
        <Route path='/login' element={!authUser ? <LoginPage/> : <Navigate to="/" />} />
        <Route path='/settings' element={<SettingsPage/>}  />
        <Route path='/profile' element={authUser ?<ProfilePage/> : <Navigate to="/login" />}  />


      </Routes>
      <Toaster/>
    </div>
  )
}

export default App