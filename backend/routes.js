const express = require('express')

const { getPopularVideos } = require('./controllers/popular-videos')
const { searchChannels, getChannelDetails } = require('./controllers/search')
const { getTopChannels } = require('./controllers/top-channels')

const router = express.Router()

router.get('/popular-videos/:country', getPopularVideos)

router.get('/top-channels', getTopChannels)

router.get('/search', searchChannels)

router.get('/search/:id', getChannelDetails)

module.exports = router
