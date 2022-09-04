const { setParams } = require('./utils')
const axios = require('axios')

const countryList = require('../countryCode.json')

class PopularVideosController {

    constructor(popularVideosService){
        this.popularVideosService = popularVideosService
    }

    async getPopularVideos(req, res) {
        const countryCode = req.params.country
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
