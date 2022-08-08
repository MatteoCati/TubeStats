import React from 'react'
import { useParams } from 'react-router-dom'

const ChannelStatsPage = () => {
    const { id } = useParams()
    return <div>{id}</div>
}

export default ChannelStatsPage