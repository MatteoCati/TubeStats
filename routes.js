const express = require('express')

const PopularVideosService = require('./services/popular-videos')
const PopularVideosController = require('./controllers/popular-videos')
const SearchChannelsController = require('./controllers/search')
const SearchChannelService = require('./services/search')
const { getTopChannels } = require('./controllers/top-channels')

const router = express.Router()

const popularVideosServiceSingleton = new PopularVideosService()
const popularVideosControllerSingleton = new PopularVideosController(popularVideosServiceSingleton)
router.get('/country-codes', popularVideosControllerSingleton.getCountryList.bind(popularVideosControllerSingleton))
router.get('/popular-videos/:country', popularVideosControllerSingleton.getPopularVideos.bind(popularVideosControllerSingleton))

router.get('/top-channels', getTopChannels)


const searchChannelServiceSingleton = new SearchChannelService()
const searchChannelsControllerSingleton = new SearchChannelsController(searchChannelServiceSingleton)
router.get('/search', searchChannelsControllerSingleton.searchChannels.bind(searchChannelsControllerSingleton))
router.get('/search/:id', searchChannelsControllerSingleton.getChannelDetails.bind(searchChannelsControllerSingleton))

module.exports = router
