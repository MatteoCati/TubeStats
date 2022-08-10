import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { useState, useEffect } from 'react'

import Home from './pages/Home'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import PopularVideos from './pages/PopularVideos'
import TopChannels from './pages/TopChannels'
import SearchChannel from './pages/SearchChannel'
import ChannelStatsPage from './pages/ChannelStats'

import './App.css'

function App() {
    const searchHook = useState('')
    const [width, setWindowWidth] = useState(0)
    useEffect(() => {
        updateDimensions()

        window.addEventListener('resize', updateDimensions)
        return () => window.removeEventListener('resize', updateDimensions)
    }, [])

    const updateDimensions = () => {
        const width = window.innerWidth
        setWindowWidth(width)
    }

    return (
        <div className='App'>
            <BrowserRouter>
                <Navbar />
                <div className='baseContainer'>
                    <Routes>
                        <Route
                            path='/'
                            element={<Home searchHook={searchHook} />}
                        />
                        <Route
                            path='/popular-videos'
                            element={<PopularVideos width={width} />}
                        />
                        <Route path='/top-channels' element={<TopChannels />} />
                        <Route
                            path='/search'
                            element={<SearchChannel searchHook={searchHook} />}
                        />
                        <Route
                            path='/search/:id'
                            element={<ChannelStatsPage />}
                        />
                    </Routes>
                </div>
                <Footer />
            </BrowserRouter>
        </div>
    )
}

export default App
