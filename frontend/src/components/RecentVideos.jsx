import React, { useState } from 'react';
import Plot from 'react-plotly.js';

import { formatDate, formatDuration, formatNumber } from '../utils';

import './RecentVideos.css'

const RecentVideos = ({ videosList, className, title }) => {
    const [key, setKey] = useState('viewCount')

    const keysList = [
        ["Views", "viewCount"],
        ["Likes", "likeCount"],
        ["Comments", "commentCount"],
        ["Duration", "duration"]
    ]

    const handleChange = (ev) => {
        setKey(ev.target.value)
    }

    const valueText = key=== 'viewCount'
        ? "views"
        : key === 'likeCount'
        ? "likes"
        : "duration"
        ? "minutes"
        : "comments"

    const customDataFormatter = key === 'duration'
        ? formatDuration
        : formatNumber

    return (
        <div className={className+" container"}> 
            <p className="sectionTitle">{title}</p>
            <div className="selectContainer">
                <p className='selectText'>Plot by: </p>
                <select onChange={handleChange} value={key} >
                    {keysList.map(l => 
                        <option key={l[1]} value={l[1]}>{l[0]}</option>)}
                </select>
            </div>
            
            <Plot
                className="plot"
                data={[
                {
                    type: 'bar', 
                    x: videosList.map(x => formatDate(x.publishedAt)).reverse(), 
                    y: videosList.map(x => x[key]).reverse(),
                    hovertext: videosList.map(x => x.title).reverse(),
                    customdata: videosList.map(x => customDataFormatter(x[key])).reverse(),
                    hovertemplate: '%{hovertext} <br>%{customdata} '+valueText+' - %{x}<extra></extra>'
                },
                ]}
            /> 
            <p className="tip">Hover on the columns to read the videos' titles</p>   
        </div>
    )
}

export default RecentVideos