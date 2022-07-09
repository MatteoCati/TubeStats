
import { useState, useEffect } from "react"
import YoutubeEmbed from "../components/Videoembed"
import "./PopularVideos.css"

const PopularVideos = () => {
    const [country, setCountry] = useState([])
    const [videos, setVideos] = useState([])
    const countryList = require('./countryCode.json')
    

    useEffect(() => {
        fetch('https://ipapi.co/json/')
        .then( res => res.json())
        .then(response => {
            setCountry(countryList.find(x => x[0] === response.country));
        })
        .catch((data, status) => {
            setCountry(["US", "United States of America"]);
        });
        }, [countryList])
    
    useEffect(() => {
        setVideos(require('./popularVideos.json'));
    }, [country])

    const handleChange = (event) => {
        console.log(event.target.value)
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
            </>
            :
            <div></div>
            }
            



        </div>
    )
}

export default PopularVideos