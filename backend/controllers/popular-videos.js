const { setParams } = require('./utils')
const axios = require('axios')

const countryList = require('../countryCode.json')

const getPopularVideos = async (req, res) => {
    try {
        const params = setParams(['snippet', 'statistics'], {
            maxResults: 10,
            chart: 'mostPopular',
            regionCode: req.params.country,
        })
        const response = await axios.get(
            'https://youtube.googleapis.com/youtube/v3/videos',
            { params }
        )
        res.json(response.data.items)
    } catch (err) {
        // Handle Error Here
        console.error(req.params.country)
        res.json({ err: 'Could not get videos for ' + req.params.country })
    }
}

const getCountryList = (req, res) => {
    res.json(countryList)
}

module.exports = { getPopularVideos, getCountryList }
