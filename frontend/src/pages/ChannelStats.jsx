import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import VideosPlot from '../components/VideosPlot'
import { formatDate, formatNumber } from '../utils'
import useDocumentTitle from "../hooks/useTitle"

import './ChannelStats.css'

const ChannelStatsPage = ({width}) => {
    const { id } = useParams()
    const [channelData, setChannelData] = useState(null)
    const [success, setSuccess] = useState(true)

    useDocumentTitle('TubeStats - Search')

    useEffect(() => {
        fetch("/api/search/"+id)
            .then(resp => resp.json())
            .then(data => {
                if(data.success){
                    setChannelData({
                        info: data.info,
                        recent: data.recent,
                        popular: data.popular
                    })
                }
                setSuccess(data.success)
            }).catch(err => console.log(err))
    }, [])
    if(!success) return <div className='errorMessage'>Something went wrong while loading the information... Please try again later</div>
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
                <VideosPlot videosList={channelData.recent} className="recentSection" title="Most Recent Videos" width={width}/>
                <VideosPlot videosList={channelData.popular} className="popularSection" title="Most Viewed Videos" width={width}/>
            </div>
        </>
    )
}

export default ChannelStatsPage
