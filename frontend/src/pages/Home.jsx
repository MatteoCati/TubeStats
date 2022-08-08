import React from 'react'
import { useNavigate } from "react-router-dom";
import "./Home.css"


import hero from './hero.jpg'
import { ReactComponent as PlotImage} from '../svgs/layer1.svg'
import SearchBar from '../components/SearchBar'
import PodiumImage from '../svgs/Top_Channel_Img.svg'

const Home = ({searchHook}) => {

    const navigate = useNavigate()

    return (
        <>
            <div className="hero-image" style={{backgroundImage: `url(${hero})`}}>
                <div className="hero-text">
                    <p className="title">Youtube Stats</p>
                    <SearchBar 
                        handleSearch={(val) => navigate('/search')} 
                        searchHook={searchHook} 
                        containerClass="searchHomeContainer" 
                        placeholder="Start by searching a channel..."/>
                </div> 
            </div>
            
            <div className="pages trendingContainer">
                <img src={PodiumImage} className="topchanimg" alt="A podium with the youtube symbol"/>
                <p className="topchantext text">What are the biggest channels<br></br>at the moment?</p>
                <button type="button" onClick={() => navigate('/top-channels')} className="button topchanbtn">Find Out</button>
            </div>
            
            <div className="middleContainer">
                <div className="pages">
                    <PlotImage className="trendingimg"/>
                    <p className="trendingtext text">Look what is trending<br/>in any country of the World!</p>
                    <button type="button" onClick={() => navigate("/popular-videos")} className="button trendingbtn">Go!</button>
                </div>
            </div>
            <div className="pages">
                <img src={hero} className="searchimg" alt="A screen with youtube open"/>
                <p className="searchtext text">Search statistics<br/>about your favourite youtuber!</p>
                <button type="button" onClick={() => navigate('/search')} className="button searchbtn">Search Now</button>
            </div>
		</>
	);
};


export default Home;