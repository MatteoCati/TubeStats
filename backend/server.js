require('dotenv').config()

const express = require('express')
const axios = require('axios').default
const channelslist = require('./channelsId.json')
const fs = require('fs');
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

const getId = async (channelName) => {
    channel = channelslist.filter(c => c.name == channelName)
    if(channel.length > 0){
        return channel[0].id
    }else {
        console.log("Looking for " + channelName)
        const resp =  await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&maxResults=1&q=${channelName}&key=${process.env.YOUTUBE_API_KEY}`)
        const data = resp.data.items[0]
        const info = {
            name: channelName,
            id: data.id.channelId,
        }
        channelslist.push(info)
        fs.writeFile("./channelsId.json", channelslist, function(err) {
            if (err) {
                console.log(err);
            }
        });
        return info.id
    }
}

app.get('/top-channels', async (req, res) => {
    const respo = await axios.get('https://en.wikipedia.org/w/api.php?action=parse&page=List_of_most-subscribed_YouTube_channels&section=1&prop=text&format=json')
    text = respo.data.parse.text['*'].replace(/\n/g,'')
    // Loop through grabbing everything
    
    start = text.indexOf('<table')
    end = text.indexOf('</table')

    table = text.slice(start, end)
    rows = table.split("</tr>").splice(1, 11)
    jsonTable = rows.map(element => {
        return element.split('</td>')
    });

    links = jsonTable.map( element => {
        
        cell = element[1]
        splits = cell.split(">")
        title = splits[splits.length-2]
        endLink = title.indexOf('</a')
        return title.slice(0, endLink)
    })

    channels = links.map(async name => {
        return await getId(name)
    })

    resolveIds = await Promise.all(channels)

    bestInfo = resolveIds.map(async id => {
        try{
            const resp =  await axios.get(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2C%20statistics&id=${id}&maxResults=1&key=${process.env.YOUTUBE_API_KEY}`);
            data = resp.data.items[0]
            return {
                title: data.snippet.title,
                subscribers: data.statistics.subscriberCount,
                thumbnail: data.snippet.thumbnails.default
            }
        }catch(err){
            console.log(id)
        }
    })
    res.json(await Promise.all(bestInfo))
})


app.listen(process.env.PORT || 8080, () => {
    console.log('Server listening on port '+(process.env.PORT || 8080))
})