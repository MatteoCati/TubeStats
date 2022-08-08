
import React, { useState, useEffect } from "react";
import YoutubeEmbed from "../components/Videoembed";
import "./PopularVideos.css";

import { formatNumber, truncateText } from "../utils"
import Loader from "../components/Loader";


const PopularVideos = () => {
	const [country, setCountry] = useState(null);
	const [videos, setVideos] = useState([]);
	const countryList = require("./countryCode.json").sort();
   
	useEffect(() => {
			fetch("https://ipapi.co/json/")
			.then( res => res.json())
			.then(response => {
				updateCountry(countryList.find(x => x[0] === response.country))
			})
			.catch((a, b) => {
				updateCountry(["US", "United States of America"])
			})	
	}, [countryList]);


	const updateCountry = (info) => {
		setVideos([])
		setCountry(info);
		fetch('/api/popular-videos/'+info[0])
				.then( res =>res.json() )
				.then(response => {
					setVideos(response);
				})
	}

	const handleChange = (event) => {
		updateCountry(JSON.parse(event.target.value))
	}

	if(!country){
		return (
			<div className="spinnerContainer">
				<Loader/>
			</div>
		)
	}

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
				<div className="spinnerContainer">
					<Loader/>
				</div>
			}
		</div>
		</>
	);
};

export default PopularVideos;