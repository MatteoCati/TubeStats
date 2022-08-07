const { setParams } = require('./utils')
const axios = require('axios')

const searchChannels = async (req, res) => {
    const channelName = req.query.key

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

const getVideosDetailsFromIdArray = async (ids) => {
    const videos = ids.map(async ({ id }) => {
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
                id: id.videoIs,
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
    console.log('First')
    const info = await axios.get(
        'https://youtube.googleapis.com/youtube/v3/channels',
        { infoParams }
    )
    console.log('Seccond')
    const popularVideosIdsParams = setParams(['id'], {
        channelId,
        maxResults: 10,
        order: 'viewCount',
        type: 'video',
    })

    const popularVideosIds = await axios.get(
        'https://youtube.googleapis.com/youtube/v3/search',
        { popularVideosIdsParams }
    )

    const recentVideosIdsParams = setParams(['id'], {
        channelId,
        maxResults: 10,
        order: 'date',
        type: 'video',
    })

    const recentVideosIds = await axios.get(
        'https://youtube.googleapis.com/youtube/v3/search',
        { params }
    )
    console.log('Test')
    res.json({
        info: info.data.items[0],
        popular: await getVideosDetailsFromIdArray(popularVideosIds),
        recent: await getVideosDetailsFromIdArray(recentVideosIds),
    })
}

module.exports = {
    getChannelDetails,
    searchChannels,
}
