const { setParams } = require('./utils')
const axios = require('axios')

const searchChannels = async (req, res) => {
    // Used stored json data instead of loading from youtube
    if (process.env.ENV_TYPE === 'offline') {
        const searchResults = require('../searchResults.json')
        res.json(searchResults)
        return
    }
    let channelName = req.query.key || ''

    const params = setParams(['snippet'], {
        type: 'channel',
        maxResults: 10,
        q: channelName,
    })

    const response = await axios.get(
        'https://www.googleapis.com/youtube/v3/search',
        { params }
    )
    res.json(response.data.items)
}

const getVideosDetailsFromIdArray = async (videoInfos) => {
    const videos = videoInfos.map(async ({ id }) => {
        const params = setParams(
            [
                'snippet',
                'contentDetails',
                'id',
                'localizations',
                'statistics',
                'topicDetails',
                'status',
                'liveStreamingDetails',
                'player',
                'recordingDetails',
            ],
            {
                id: id.videoId,
            }
        )

        const video = await axios.get(
            'https://youtube.googleapis.com/youtube/v3/videos',
            { params }
        )

        return video.data.items[0]
    })
    return await Promise.all(videos)
}

const getChannelDetails = async (req, res) => {
    // Used stored json data instead of loading from youtube
    if (process.env.ENV_TYPE === 'offline') {
        const searchResults = require('../searchChannel.json')
        res.json(searchResults)
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

    console.log(popularVideosIds.data.items)

    res.json({
        info: info.data.items[0],
        popular: await getVideosDetailsFromIdArray(popularVideosIds.data.items),
        recent: await getVideosDetailsFromIdArray(recentVideosIds.data.items),
    })
}

module.exports = {
    getChannelDetails,
    searchChannels,
}
