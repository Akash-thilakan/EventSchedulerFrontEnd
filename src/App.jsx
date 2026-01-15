
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './common/Home'
import Login from './common/Login'
import AddEvent from './common/AddEvent'
import Header from './common/components/Header'
import { useEffect, useState } from 'react'
  import { ToastContainer, toast } from 'react-toastify';
import EditEvent from './common/EditEvent'

function App() {
   const [IsLoggedIn, setIsLoggedIn] = useState(false);
 
  useEffect(() => {
  if(sessionStorage.getItem("admin")){
     setIsLoggedIn(true)
   }
  }, []);
  

  return (
    <>
    <Header IsLoggedIn={IsLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
    <Routes>
      <Route path='/' element={<Home IsLoggedIn={IsLoggedIn}/>} />
      <Route path='/login' element={<Login setIsLoggedIn={setIsLoggedIn}/>} />
      <Route path='/add-event' element={<AddEvent/>} />
      <Route path='/edit-event/:id' element={<EditEvent/>} />

    </Routes>
      <ToastContainer />
    </>
  )
}

export default App
