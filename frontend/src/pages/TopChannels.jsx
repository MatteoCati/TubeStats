import React, { useEffect, useState } from "react";
import Loader from '../components/Loader';
import { formatNumber } from "../utils";
import useDocumentTitle from "../hooks/useTitle"

import './TopChannels.css'

const TopChannelRow = ({channelInfo, position}) => {
    return (
        <div className={"channelRow " + (position%2 === 1 ? "evenRow" : "oddRow") }>
            <p className="number">{position}.</p>
            <img alt="Channel avatar" src={channelInfo.thumbnail.url} className="avatar"/>
            <div className="channelName">
                <a href={channelInfo.url}  target="_blank" rel="noopener noreferrer">{channelInfo.title}</a>
                <p>{formatNumber(channelInfo.subscribers)} subscribers</p>
            </div>
            
        </div>
    )
}

const TopChannels = () => {
    const [channelsList, setChannelsList] = useState([])

    useDocumentTitle('TubeStats - Top Channels')
    
    useEffect(() => {
        fetch('/api/top-channels')
        .then(res => res.json())
        .then(data => {
            setChannelsList(data)
        })
        .catch(err => console.log(err))
    }, [])

    return (
        <div className="pages">
            <div className="titleContainer"><p className="subTitle">Top Channels</p></div>
            {channelsList.length === 0 
            ?
            <div className="spinnerContainer">
				<Loader/>
			</div>
            :
            <div className="listContainer">
                {channelsList.map((channel, idx) => 
                    <TopChannelRow channelInfo={channel} position={idx+1} key={channel.title}/>
                )}
            </div>
            }
        </div>
    )
}

export default TopChannels;