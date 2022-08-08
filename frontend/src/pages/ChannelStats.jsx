import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import RecentVideos from '../components/RecentVideos'
import { formatDate, formatNumber } from '../utils'

import './ChannelStats.css'

const ChannelStatsPage = () => {
    const { id } = useParams()
    const [channelData, setChannelData] = useState(null)

    useEffect(() => {
        fetch("/api/search/"+id)
            .then(resp => resp.json())
            .then(data => {
                setChannelData(data)
            }).catch(err => console.log(err))
    }, [])
    if(!channelData) return <></>
    //console.log(channelData.info)

    const subscribersCount = channelData.info.statistics.hiddenSubscriberCount
        ? "hidden"
        : formatNumber(channelData.info.statistics.subscriberCount)

    return (
        <>
            <img className="banner" src={channelData.info.brandingSettings.image.bannerExternalUrl} alt="Channel banner"/>
            <div className='pages'>
                <div className='channelTitleContainer'>
                    <img alt="Channel avatar" src={channelData.info.snippet.thumbnails.default.url} className="avatar"/>
                    <p className='channelTitle'>{channelData.info.snippet.title}</p>
                </div>
                <p className="createdOn">Created on: {formatDate(channelData.info.snippet.publishedAt)} {'('}{channelData.info.snippet.country}{')'} </p>
                <p className='subscribersCount'>Subscribers: {subscribersCount}</p>
                <p className='viewsCount'>Views: {formatNumber(channelData.info.statistics.viewCount)}</p>
                <p className='videosCount'>Published Videos: {formatNumber(channelData.info.statistics.videoCount)}</p>
                <RecentVideos videosList={channelData.recent} className="recentSection" title="Most Recent Videos"/>
            </div>
        </>
    )
}

export default ChannelStatsPage