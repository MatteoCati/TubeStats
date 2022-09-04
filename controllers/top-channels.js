class TopChannelsController {
    constructor(topChannelsService){
        this.topChannelsService = topChannelsService
    }

    async getTopChannels(req, res) {
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
