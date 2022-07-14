
import { useState, useEffect } from "react";
import YoutubeEmbed from "../components/Videoembed";
import "./PopularVideos.css";
import React from "react";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const PopularVideos = () => {
	const [country, setCountry] = useState([]);
	const [videos, setVideos] = useState([]);
	const countryList = require("./countryCode.json");

	const responsive = {
		desktop: {
			breakpoint: { max: 3000, min: 1024 },
			items: 3,
			slidesToSlide: 3 // optional, default to 1.
		},
		tablet: {
			breakpoint: { max: 1024, min: 464 },
			items: 2,
			slidesToSlide: 2 // optional, default to 1.
		},
		mobile: {
			breakpoint: { max: 464, min: 0 },
			items: 1,
			slidesToSlide: 1 // optional, default to 1.
		}
	};
    
	useEffect(() => {
		
			fetch("https://ipapi.co/json/")
			.then( res => res.json())
			.then(response => {
				setCountry(countryList.find(x => x[0] === response.country));
			})
			.catch((a, b) => {

				setCountry(["US", "United States of America"]);
			});
		
		
	}, [countryList]);
    
	useEffect(() => {
		if(country.length > 0) {
			fetch('/popular-videos/'+country[0])
				.then( res =>res.json() )
				.then(response => {
					console.log(response)
					setVideos(response);
				})
		}
			
	}, [country]);

	const handleChange = (event) => {
		console.log(event.target.value);
		setCountry(JSON.parse(event.target.value));
	};

	return (
		<div className="pages">
			<div className="titleContainer"><p className="subTitle">Popular Videos in {country[1]}</p> </div>
			<select className="selectCountry" onChange={handleChange} value={JSON.stringify(country)} >
				{countryList.map(l => 
					<option key={l[0]} value={JSON.stringify(l)}>{l[1]}</option>)}
			</select>
			{ videos.length > 0
				?
				<>
					<YoutubeEmbed embedId={videos[0].id} className="mainVideo" />
					<div className="mainVideoTitle">{videos[0].snippet.title}</div>
					<div className="mainVideoAuthor">{videos[0].snippet.channelTitle}</div>
					<div className="mainVideoViews">{videos[0].statistics.viewCount} views</div>
					<div className="mainVideoDescription">{videos[0].snippet.localized.description.substr(0, 128)}...</div>
						<Carousel
							responsive={responsive}
							infinite={false}
							itemClass="carouselItem"
							containerClass="videosCarousel"
							slidesToSlide={2}
						>
							{videos.map(video => { 
								return (
								<div key={video.id}>
									<YoutubeEmbed embedId={video.id} className="mainVideo" />
									<div>{video.snippet.title}</div>
									<div>{video.statistics.viewCount} views</div>
								</div>
								)}
							)}
						</Carousel>
				</>
				:
				<div></div>
			}
		</div>
	);
};

export default PopularVideos;