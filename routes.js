const express = require('express')

const {
    getPopularVideos,
    getCountryList,
} = require('./controllers/popular-videos')
const SearchChannelsController = require('./controllers/search')
const SearchChannelService = require('./services/search')
const { getTopChannels } = require('./controllers/top-channels')

const router = express.Router()

router.get('/country-codes', getCountryList)

router.get('/popular-videos/:country', getPopularVideos)

router.get('/top-channels', getTopChannels)


const searchChannelServiceSingleton = new SearchChannelService()
const searchChannelsControllerSingleton = new SearchChannelsController(searchChannelServiceSingleton)
router.get('/search', searchChannelsControllerSingleton.searchChannels.bind(searchChannelsControllerSingleton))
router.get('/search/:id', searchChannelsControllerSingleton.getChannelDetails.bind(searchChannelsControllerSingleton))

module.exports = router
