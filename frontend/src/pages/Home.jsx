import React from 'react'
import { useNavigate } from "react-router-dom";
import "./Home.css"

const Home = () => {

    const navigate = useNavigate()

    return (
        <>
            <div className="hero">
                <div>
                    <p className="title">Youtube<br></br> Stats</p>
                    <p className="text">Find out the most recent statistics<br></br> about your favourite Youtubers!</p>
                    <button type="button" onClick={() => navigate('/search')} className="button">START</button>
                </div>
                
                <img src="layer1.svg" className="mainImage" alt="Example graph"/>
            </div>
            <div className="pages">
                <img src="Top_Channel_Img.svg" className="topchanimg" alt="A podium with the youtube symbol"/>
                <p className="topchantext text">What are the biggest channels<br></br>at the moment?</p>
                <button type="button" onClick={() => navigate('/top-channels')} className="button topchanbtn">Find Out</button>

                <img src="Top_Channel_Img.svg" className="trandingimg" alt="A podium with the youtube symbol"/>
                <p className="trandingtext text">Look what is tranding<br/>in any country of the World!</p>
                <button type="button" onClick={() => navigate("/popular-videos")} className="button trandingbtn">Go!</button>
            </div>
		</>
	);
};


export default Home;