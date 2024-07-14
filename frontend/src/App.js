import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import About from './pages/About'
import Profile from './pages/Profile'
import Header from './components/Header'
import PrivateRoute from './components/PrivateRoute'


const App = () => {
  return (
    <BrowserRouter>
        <Header/>
        <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/login' element={<Login/>}/>
        <Route exact path='/register' element={<Register/>}/>
        <Route exact path='/about' element={<About/>}/>
        <Route element={<PrivateRoute/>} >
          <Route exact path='/profile' element={<Profile/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App