const express = require('express')
const videosList = require('./popularVideos.json')

app = express()


app.get('/popular-videos/:country', (req, res) => {
    console.log(req.params.country)
    res.json(videosList)
})

app.listen(4000, () => {
    console.log('Server listining on port 4000')
})