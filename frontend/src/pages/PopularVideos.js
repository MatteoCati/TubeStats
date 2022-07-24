
import { useState, useEffect } from "react";
import YoutubeEmbed from "../components/Videoembed";
import "./PopularVideos.css";
import React from "react";

import { formatNumber, truncateText } from "../utils"


const PopularVideos = () => {
	const [country, setCountry] = useState(["US", "United States of America"]);
	const [videos, setVideos] = useState([]);
	const countryList = require("./countryCode.json").sort();
    
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
		<>
		<div className="titleContainer"><p className="subTitle">Popular Videos in {country[1]}</p> </div>
		<div className="pages">
			
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
					<div className="mainVideoViews">{formatNumber(videos[0].statistics.viewCount)} views</div>
					<div className="mainVideoDescription">{truncateText(videos[0].snippet.localized.description, 128)}...</div>
					
					{videos.slice(1, videos.length).map((video, key) => { 
						return (
							<>
								<span style={{gridRow: (10+key*3).toString()}} className="videoListCounter"><strong>{key+2}.</strong></span>
								<YoutubeEmbed embedId={video.id} className="videoListItem"  style={{gridRow: (10+key*3).toString()+" / span 3"}}/>
								<span style={{gridRow: (10+key*3).toString()}} className="videoListText">{video.snippet.title}</span>
								<span style={{gridRow: (11+key*3).toString()}} className="videoListText">
									{video.snippet.channelTitle}<br/>
									{formatNumber(video.statistics.viewCount)} views
								</span>
							</>
						)}
					)}
					
				</>
				:
				<div></div>
			}
		</div>
		</>
	);
};

export default PopularVideos;