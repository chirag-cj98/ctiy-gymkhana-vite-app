import Home from './pages/Home'
import About from './pages/About'
import { Route, Routes } from "react-router-dom";
import './App.css'
import Nav from './components/Nav/Nav';
import Facilities from './pages/Facilities';
import Contact from './pages/Contact';
import Achievments from './pages/Achievments';
import EventsPage from './pages/Event';
import Gallery from './pages/Gallery';
import Training from './pages/Training';
import Supporters from './pages/Supporters';
import KSCAHistory from './pages/KSCAHistory';

function App() {

  return (
    <>
      <Nav />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/facility' element={<Facilities />} />
        <Route path='/contact-us' element={<Contact />} />
        <Route path='/events' element={<EventsPage />} />
        <Route path='/achievments' element={<Achievments />} />
        <Route path='/gallery' element={<Gallery />} />
        <Route path='/training' element={<Training />} />
        <Route path='/supporters' element={<Supporters />} />
        <Route path='/ksca-history' element={<KSCAHistory />} />
      </Routes>

    </>
  )
}

export default App
