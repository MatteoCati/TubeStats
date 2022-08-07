require('dotenv').config()
const express = require('express')
const axios = require('axios').default

const { getPopularVideos } = require('./controllers/popular-videos')
const { searchChannels, getChannelDetails } = require('./controllers/search')
const { getTopChannels } = require('./controllers/top-channels')

app = express()

app.get('/popular-videos/:country', getPopularVideos)

app.get('/api/top-channels', getTopChannels)

app.get('/search', searchChannels)

app.get('/search/:id', getChannelDetails)

app.listen(process.env.PORT || 8080, () => {
    console.log('Server listening on port ' + (process.env.PORT || 8080))
})
