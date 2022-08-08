import React, { useState } from 'react';
import Plot from 'react-plotly.js';

import { formatDate } from '../utils';

import './RecentVideos.css'

const RecentVideos = ({ recentVideos, className }) => {
    const [key, setKey] = useState('viewCount')

    const keysList = [
        ["Views", "viewCount"],
        ["Likes", "likeCount"],
        ["Comments", "commentCount"],
    ]

    const handleChange = (ev) => {
        setKey(ev.target.value)
    }

    const valueText = key=== 'viewCount'
        ? "views"
        : key === 'likeCount'
        ? "likes"
        : "comments"

    return (
        <div className={className+" container"}> 
            <p className="sectionTitle">Most Recent Videos</p>
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
                    x: recentVideos.map(x => formatDate(x.publishedAt)).reverse(), 
                    y: recentVideos.map(x => x[key]).reverse(),
                    hovertext: recentVideos.map(x => x.title).reverse(),
                    hovertemplate: '%{hovertext} <br> %{y} '+valueText+' - %{x}<extra></extra>'
                },
                ]}
            /> 
            <p className="tip">Hover on the columns to read the videos' titles</p>   
        </div>
    )
}

export default RecentVideos