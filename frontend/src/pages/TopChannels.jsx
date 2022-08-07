import { useEffect, useState } from "react";
import Loader from '../components/Loader';
import { formatNumber } from "../utils";

import './TopChannels.css'

const TopChannelRow = ({channelInfo, position}) => {
    return (
        <div className={"channelRow " + (position%2 === 1 ? "evenRow" : "oddRow") }>
            <div className={"channelName"}>
            <p className="number">{position}.</p>
            <img alt="Channel avatar" src={channelInfo.thumbnail.url} className="avatar"/>
            <a href={channelInfo.url}  target="_blank" rel="noreferrer">{channelInfo.title}</a>
            </div>
            <p>{formatNumber(channelInfo.subscribers)} subscribers</p>
        </div>
    )
}

const TopChannels = () => {
    const [channelsList, setChannelsList] = useState([])

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