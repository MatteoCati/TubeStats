const { setParams } = require('../controllers/utils')
const axios = require('axios')
const moment = require('moment')


class SearchChannelsService {
    async getChannels(searchQuery){
        const params = setParams(['snippet'], {
            type: 'channel',
            maxResults: 10,
            q: searchQuery,
        })

        const response = await axios.get(
            'https://www.googleapis.com/youtube/v3/search',
            {params}
        )

        return response.data.items
    }

    async getVideosDetailsFromIdArray(videoInfos){
        const videos = videoInfos.map(async ({id}) => {
            const params = setParams(['snippet', 'contentDetails', 'statistics'], {
                id: id.videoId,
            })

            const video = await axios.get(
                'https://youtube.googleapis.com/youtube/v3/videos',
                {params}
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

    async getDetails(channelId){
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
            {id: channelId}
        )

        const info = await axios.get(
            'https://youtube.googleapis.com/youtube/v3/channels',
            {params: infoParams}
        )

        const popularVideosIdsParams = setParams(['id'], {
            channelId,
            maxResults: 10,
            order: 'viewCount',
            type: 'video',
        })

        const popularVideosIds = await axios.get(
            'https://youtube.googleapis.com/youtube/v3/search',
            {params: popularVideosIdsParams}
        )

        const recentVideosIdsParams = setParams(['id'], {
            channelId,
            maxResults: 10,
            order: 'date',
            type: 'video',
        })

        const recentVideosIds = await axios.get(
            'https://youtube.googleapis.com/youtube/v3/search',
            {params: recentVideosIdsParams}
        )
        return {
            info: info.data.items[0],
            popular: await this.getVideosDetailsFromIdArray(popularVideosIds.data.items),
            recent: await this.getVideosDetailsFromIdArray(recentVideosIds.data.items),
        }
    }
}

module.exports = SearchChannelsService
