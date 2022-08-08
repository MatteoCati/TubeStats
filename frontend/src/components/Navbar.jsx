import React from 'react'
import { Link, useLocation }  from 'react-router-dom'
import { ReactComponent as Logo } from '../svgs/logo.svg'

import './Navbar.css'

const Navbar = () => {

    const location = useLocation()
    
    return (
        <header className ="navbar">
            <div className="container">
                <Link to="/" style={{display: "flex", flexDirection: "row", alignItems: "center"}}  className="blackLink">
                    <Logo/>
                    <p className="logoText">TubeStats</p>
                </Link>
                <div className="menu"> 
                    <Link to="/search" className="blackLink" style={{color: location.pathname === "/search" ? "#D4D4D4D4" : "black" }}>Search</Link>
                    <Link to="/popular-videos" className="blackLink" style={{color: location.pathname === "/popular-videos" ? "#D4D4D4D4" : "black" }}>Popular Videos</Link>
                    <Link to="/top-channels" className="blackLink" style={{color: location.pathname === "/top-channels" ? "#D4D4D4D4" : "black" }}>Top Channels</Link>
                </div>
            </div>
        </header>
    )
}

export default Navbar