class SearchChannelController {

    constructor(searchChannelsService) {
        this.searchChannelsService = searchChannelsService
    }

    async searchChannels(req, res) {
        // Used stored json data instead of loading from youtube
        if (process.env.ENV_TYPE === 'offline') {
            const searchResults = require('../offline-data/searchResults.json')
            res.json({success: true, items: searchResults})
            return
        }

        try {
            const channelName = req.query.key || ''
            const items = await this.searchChannelsService.getChannels(channelName)
            res.json({ items: items, success: true})
        } catch (err) {
            console.log(err)
            res.json({success: false, message: 'Failed Fetch'})
        }
    }

    async getChannelDetails(req, res){
        // Used stored json data instead of loading from youtube
        if (process.env.ENV_TYPE === 'offline') {
            const searchResults = require('../offline-data/searchChannel.json')
            res.json({...searchResults, success: true})
            return
        }

        try {
            const channelId = req.params.id
            const channelInfo = await this.searchChannelsService.getDetails(channelId)
            res.json({
                ...channelInfo,
                success: true,
            })
        } catch (err) {
            res.json({success: false, message: 'Failed Fetch'})
        }

    }
}

module.exports = SearchChannelController
