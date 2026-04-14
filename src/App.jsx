import { useState,useEffect } from 'react'
import { Route,Routes } from 'react-router-dom'
import './App.css'
import FreeLance from "./component/FreeLance"
import AOS from 'aos';
import 'aos/dist/aos.css';
import AllProjects from './component/AllProjects';
function App() {
useEffect(() => {
AOS.init({
offset: 200,
duration: 600,
easing: 'ease-in-sine',
delay: 100,
});
}, []);

  return (
    <>
    
      <Routes>
        <Route path='/' element={<FreeLance/>}/>
        <Route path='/projects' element={<AllProjects/>}/>
      </Routes>
    </>
  )
}

export default App
