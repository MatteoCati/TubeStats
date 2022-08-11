const fs = require('fs')

const { setParams } = require('./utils')
const axios = require('axios')
const channelslist = require('../channelsId.json')

const getListFromWikipedia = async () => {
    const response = await axios.get('https://en.wikipedia.org/w/api.php', {
        params: {
            action: 'parse',
            page: 'List_of_most-subscribed_YouTube_channels',
            section: '1',
            prop: 'text',
            format: 'json',
        },
    })

    // Parse text
    const text = response.data.parse.text['*'].replace(/\n/g, '')

    // Select table from text
    const start = text.indexOf('<table')
    const end = text.indexOf('</table')
    const table = text.slice(start, end)

    // Split table into rows, take first 10
    const rows = table.split('</tr>').splice(1, 10)

    // Split cells of each row
    const jsonTable = rows.map((element) => {
        return element.split('</td>')
    })

    return jsonTable.map((element) => {
        const cell = element[1]
        const splits = cell.split('>')
        const title = splits[splits.length - 2]
        const endLink = title.indexOf('</a')
        return title.slice(0, endLink)
    })
}

const getId = async (channelName) => {
    // Try to get channel ID from downloaded list
    const channel = channelslist.filter((c) => c.name === channelName)
    if (channel.length > 0) {
        return channel[0].id
    } else {
        // Get channel ID from API
        console.log('Looking for ' + channelName)
        const params = setParams(['snippet'], {
            type: 'channel',
            maxResults: 1,
            q: channelName,
        })

        const response = await axios.get(
            'https://www.googleapis.com/youtube/v3/search',
            { params }
        )

        const data = response.data.items[0]
        const info = {
            name: channelName,
            id: data.id.channelId,
        }

        // Save channel ID into json to avoid calling API again
        channelslist.push(info)
        fs.writeFile('./channelsId.json', channelslist, function (err) {
            if (err) {
                console.log(err)
            }
        })
        return info.id
    }
}

const getTopChannels = async (req, res) => {
    const links = await getListFromWikipedia()
    channels = links.map(async (name) => {
        return await getId(name)
    })

    resolveIds = await Promise.all(channels)

    bestInfo = resolveIds.map(async (id) => {
        try {
            const params = setParams(['snippet', 'statistics'], {
                id,
                maxResults: 1,
            })
            const retrievedChannels = await axios.get(
                'https://youtube.googleapis.com/youtube/v3/channels',
                { params }
            )
            data = retrievedChannels.data.items[0]
            return {
                title: data.snippet.title,
                url: 'https://www.youtube.com/channel/' + data.id,
                subscribers: data.statistics.subscriberCount,
                thumbnail: data.snippet.thumbnails.default,
            }
        } catch (err) {
            console.log('Could not find channel with id', id)
        }
    })
    res.json(await Promise.all(bestInfo))
}

module.exports = {
    getTopChannels,
}
