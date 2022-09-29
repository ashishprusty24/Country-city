import { Route, Routes } from 'react-router-dom';
import './App.css';
import City from './Components/City/City';
import Country from './Components/Country/Country';
import Home from './Components/Home/Home';
import Navbar from './Components/Navbar/Navbar';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/add-country' element={<Country />} />
        <Route path='/add-city' element={<City />} />
      </Routes>
    </div>
  );
}

export default App;
