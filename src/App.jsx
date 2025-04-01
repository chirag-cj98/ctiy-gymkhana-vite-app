import Home from './pages/Home'
import About from './pages/About'
import { Route, Routes } from "react-router-dom";
import './App.css'
import Nav from './components/Nav/Nav';
import Facilities from './pages/Facilities';
import Contact from './pages/Contact';
import Achievments from './pages/Achievments';
import Gallery from './pages/Gallery';
import Training from './pages/Training';

function App() {

  return (
    <>
      <Nav/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/facility' element={<Facilities/>}/>
        <Route path='/contact-us' element={<Contact/>}/>
        <Route path='/achievments' element={<Achievments/>}/>
        <Route path='/gallery' element={<Gallery/>}/>
        <Route path='/training' element={<Training/>}/>
      </Routes>

    </>
  )
}

export default App
