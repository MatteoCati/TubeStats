import React from 'react'
import { useNavigate } from "react-router-dom";
import "./Home.css"


import hero from './hero.jpg'
import { ReactComponent as PlotImage} from '../svgs/layer1.svg'
import SearchBar from '../components/SearchBar'

const Home = ({searchHook}) => {

    const navigate = useNavigate()

    return (
        <>
            <div className="hero-image" style={{backgroundImage: `url(${hero})`}}>
                <div className="hero-text">
                    <p className="title">Youtube Stats</p>
                    <SearchBar handleSearch={(val) => navigate('/search')} searchHook={searchHook} containerClass="searchHomeContainer" placeholder="Seach a channel to start..."/>
                </div> 
            </div>
            
            <div className="pages">
                <img src="Top_Channel_Img.svg" className="topchanimg" alt="A podium with the youtube symbol"/>
                <p className="topchantext text">What are the biggest channels<br></br>at the moment?</p>
                <button type="button" onClick={() => navigate('/top-channels')} className="button topchanbtn">Find Out</button>

                <PlotImage className="trandingimg"/>
                <p className="trandingtext text">Look what is tranding<br/>in any country of the World!</p>
                <button type="button" onClick={() => navigate("/popular-videos")} className="button trandingbtn">Go!</button>
            </div>
		</>
	);
};


export default Home;