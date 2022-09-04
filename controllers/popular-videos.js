const popularVideosList = require("../popularVideos.json");

const countryList = require('../countryCode.json')

class PopularVideosController {

    constructor(popularVideosService){
        this.popularVideosService = popularVideosService
    }

    async getPopularVideos(req, res) {
        const countryCode = req.params.country

        if(process.env.ENV_TYPE === 'offline'){
            res.json({success: true, videos: popularVideosList})
            return
        }

        try {
            const videos = await this.popularVideosService.getPopularVideos(countryCode)
            res.json({videos: videos, success: true})
        } catch (err) {
            // Handle Error
            console.error('Error while loading popular videos for ' + countryCode)
            res.json({success: false, err: 'Could not get videos for ' + countryCode})
        }
    }

    getCountryList(req, res) {
        res.json(countryList)
    }
}

module.exports = PopularVideosController
