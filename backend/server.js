require('dotenv').config()

const express = require('express')
const axios = require('axios').default

app = express()


app.get('/popular-videos/:country', async (req, res) => {
    
    try {
        const resp =  await axios.get(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2cstatistics&maxResults=10&chart=mostPopular&regionCode=${req.params.country}&key=${process.env.YOUTUBE_API_KEY}`);
        res.json(resp.data.items)
    } catch (err) {
        // Handle Error Here
        console.error(req.params.country);
        res.json({err: "invalid code "+req.params.country})
    }
})


app.listen(process.env.PORT || 8080, () => {
    console.log('Server listening on port '+(process.env.PORT || 8080))
})