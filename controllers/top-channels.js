const topChannelsList = require('../topChannels.json')

class TopChannelsController {
    constructor(topChannelsService){
        this.topChannelsService = topChannelsService
    }

    async getTopChannels(req, res) {
        if(process.env.ENV_TYPE === 'offline'){
            res.json({success: true, items: topChannelsList})
            return
        }
        try{
            const items = await this.topChannelsService.getTopChannels()
            res.json({items: items, success: true})
        }catch(err){
            console.log(err)
            res.json({success: false, message: 'could not fetch top channels'})
        }
    }
}

module.exports = TopChannelsController
