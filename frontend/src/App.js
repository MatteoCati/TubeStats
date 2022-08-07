import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import PopularVideos from './pages/PopularVideos'
import TopChannels from './pages/TopChannels'
import SearchChannel from './pages/SearchChannel'

import './App.css'

function App() {
    return (
        <div className='App'>
            <BrowserRouter>
                <Navbar />
                <div style={{ paddingTop: '80px' }}>
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route
                            path='/popular-videos'
                            element={<PopularVideos />}
                        />
                        <Route path='/top-channels' element={<TopChannels />} />
                        <Route path='/search' element={<SearchChannel />} />
                    </Routes>
                </div>
                <Footer />
            </BrowserRouter>
        </div>
    )
}

export default App
