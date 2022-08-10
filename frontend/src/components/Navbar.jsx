import React, { useState, useRef, useEffect } from 'react'
import { Link, useLocation }  from 'react-router-dom'
import { ReactComponent as Logo } from '../svgs/logo.svg'

import './Navbar.css'

const Navbar = () => {

    const location = useLocation()
    const [showSide, setShowSide] = useState(false)
    const sideNavRef = useRef(null);

    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
          if (sideNavRef.current && !sideNavRef.current.contains(event.target)) {
            setShowSide(false)
          }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          // Unbind the event listener on clean up
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [sideNavRef]);

    return (
        <>
        <header className ="navbar">
            <div className="container">
                <Link to="/" style={{display: "flex", flexDirection: "row", alignItems: "center"}}  className="blackLink logoLink">
                    <Logo className="logoImage"/>
                    <p className="logoText">TubeStats</p>
                </Link> 
                <div className="menu"> 
                    <Link to="/search" className="blackLink" style={{color: location.pathname === "/search" ? "#D4D4D4D4" : "black" }}>Search</Link>
                    <Link to="/popular-videos" className="blackLink" style={{color: location.pathname === "/popular-videos" ? "#D4D4D4D4" : "black" }}>Popular Videos</Link>
                    <Link to="/top-channels" className="blackLink" style={{color: location.pathname === "/top-channels" ? "#D4D4D4D4" : "black" }}>Top Channels</Link>
                </div>
                <div className="openSideMenu" onClick={() => setShowSide(true)}>
                    =
                </div>
            </div>
        </header>
        { showSide && (
            <div class="sidenav" ref={sideNavRef}>
                <Link to="/" className="blackLink"  onClick={() => setShowSide(false)} style={{color: location.pathname === "/" ? "#D4D4D4D4" : "black" }}>Home Page</Link>
                <Link to="/search" className="blackLink"  onClick={() => setShowSide(false)} style={{color: location.pathname === "/search" ? "#D4D4D4D4" : "black" }}>Search</Link>
                <Link to="/popular-videos" className="blackLink"  onClick={() => setShowSide(false)} style={{color: location.pathname === "/popular-videos" ? "#D4D4D4D4" : "black" }}>Popular Videos</Link>
                <Link to="/top-channels" className="blackLink"  onClick={() => setShowSide(false)} style={{color: location.pathname === "/top-channels" ? "#D4D4D4D4" : "black" }}>Top Channels</Link>
            </div>
        )}
        </>
    )
}

export default Navbar