import {BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Navbar from './components/Navbar'
import Footer from './components/Footer';
import PopularVideos from './pages/PopularVideos';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <div style={{paddingTop: "80px"}}>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/popular-videos" element={<PopularVideos/>}/>
          </Routes>
        </div>
        <Footer/>
      </BrowserRouter>

    </div>
  );
}

export default App;
