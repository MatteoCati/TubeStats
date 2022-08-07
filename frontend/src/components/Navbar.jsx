import { Link, useLocation }  from 'react-router-dom'

import './Navbar.css'

const Navbar = ({ loggedIn }) => {

    const location = useLocation()
    
    return (
        <header className ="navbar">
            <div className="container">
                <Link to="/" style={{display: "flex", flexDirection: "row", alignItems: "center"}}  className="blackLink">
                    <img src="logo.svg" alt="logo"/>
                    <p className="logoText">TubeStats</p>
                </Link>
                <div className="menu"> 
                    <Link to="/search" className="blackLink" style={{color: location.pathname === "/search" ? "#D4D4D4D4" : "black" }}>Search</Link>
                    <Link to="/popular-videos" className="blackLink" style={{color: location.pathname === "/popular-videos" ? "#D4D4D4D4" : "black" }}>Popular Videos</Link>
                    <Link to="/top-channels" className="blackLink" style={{color: location.pathname === "/top-channels" ? "#D4D4D4D4" : "black" }}>Top Channels</Link>
                    {loggedIn ?
                        <Link to="/logout" className="blackLink" style={{color: location.pathname === "/signin" ? "#D4D4D4D4" : "black" }}>Log out</Link>
                        :
                        <Link to="/signin" className="blackLink" style={{color: location.pathname === "/signin" ? "#D4D4D4D4" : "black" }}>Sign In</Link>
                    }
                </div>
            </div>
        </header>
    )
}

export default Navbar