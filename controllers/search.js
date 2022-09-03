const { setParams } = require('./utils')
const axios = require('axios')
const moment = require('moment')

const searchChannels = async (req, res) => {
    // Used stored json data instead of loading from youtube
    if (process.env.ENV_TYPE === 'offline') {
        const searchResults = require('../searchResults.json')
        res.json({success: true, items: searchResults})
        return
    }
    let channelName = req.query.key || ''
    try {
        const params = setParams(['snippet'], {
            type: 'channel',
            maxResults: 10,
            q: channelName,
        })

        const response = await axios.get(
            'https://www.googleapis.com/youtube/v3/search',
            { params }
        )
        res.json({items: response.data.items, success: true})
    } catch(err) {
        res.json({success: false, message: 'Failed Fetch'})
    }
}

const getVideosDetailsFromIdArray = async (videoInfos) => {
    const videos = videoInfos.map(async ({ id }) => {
        const params = setParams(['snippet', 'contentDetails', 'statistics'], {
            id: id.videoId,
        })

        const video = await axios.get(
            'https://youtube.googleapis.com/youtube/v3/videos',
            { params }
        )

        return video.data.items[0]
    })
    const resolved = await Promise.all(videos)

    return resolved.map((x, idx) => ({
        title: x.snippet.title,
        publishedAt: x.snippet.publishedAt,
        id: videoInfos[idx].id.videoId,
        duration: moment.duration(x.contentDetails.duration).asSeconds(),
        viewCount: x.statistics.viewCount,
        commentCount: x.statistics.commentCount,
        likeCount: x.statistics.likeCount,
    }))
}

const getChannelDetails = async (req, res) => {
    // Used stored json data instead of loading from youtube
    if (process.env.ENV_TYPE === 'offline') {
        const searchResults = require('../searchChannel.json')
        res.json({ ...searchResults, success: true })
        return
    }

    const channelId = req.params.id

    const infoParams = setParams(
        [
            'brandingSettings',
            'contentDetails',
            'contentOwnerDetails',
            'id',
            'localizations',
            'snippet',
            'statistics',
            'status',
            'topicDetails',
        ],
        { id: channelId }
    )
    try {
        const info = await axios.get(
            'https://youtube.googleapis.com/youtube/v3/channels',
            { params: infoParams }
        )

        const popularVideosIdsParams = setParams(['id'], {
            channelId,
            maxResults: 10,
            order: 'viewCount',
            type: 'video',
        })

        const popularVideosIds = await axios.get(
            'https://youtube.googleapis.com/youtube/v3/search',
            { params: popularVideosIdsParams }
        )

        const recentVideosIdsParams = setParams(['id'], {
            channelId,
            maxResults: 10,
            order: 'date',
            type: 'video',
        })

        const recentVideosIds = await axios.get(
            'https://youtube.googleapis.com/youtube/v3/search',
            { params: recentVideosIdsParams }
        )

        res.json({
            success: true,
            info: info.data.items[0],
            popular: await getVideosDetailsFromIdArray(popularVideosIds.data.items),
            recent: await getVideosDetailsFromIdArray(recentVideosIds.data.items),
        })
    } catch(err){
        res.json({ success: false, message: 'Failed Fetch' })
    }

}

module.exports = {
    getChannelDetails,
    searchChannels,
}
