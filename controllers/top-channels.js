const fs = require('fs')

const { setParams } = require('./utils')
const axios = require('axios')
const channelslist = require('../channelsId.json')
class TopChannelsController {

    async getListFromWikipedia() {
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
            const cell = element[0]
            const splits = cell.split('>')
            const title = splits[splits.length - 2]
            const endLink = title.indexOf('</a')
            return title.slice(0, endLink)
        })
    }

    async getId(channelName) {
        // Try to get channel ID from downloaded list
        const channel = channelslist.filter((c) => c.name === channelName)
        if (channel.length > 0) {
            return channel[0].id
        } else if (process.env.ENV_TYPE === 'offline') {
            return 'UCX6OQ3DkcsbYNE6H8uQQuVA';
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
                {params}
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

    async getTopChannels(req, res) {
        const links = await this.getListFromWikipedia()
        const channels = links.map(async (name) => {
            return await this.getId(name)
        })

        const resolveIds = await Promise.all(channels)
        let success = true
        const bestInfo = resolveIds.map(async (id) => {
            try {
                const params = setParams(['snippet', 'statistics'], {
                    id,
                    maxResults: 1,
                })
                const retrievedChannels = await axios.get(
                    'https://youtube.googleapis.com/youtube/v3/channels',
                    {params}
                )
                const data = retrievedChannels.data.items[0]
                return {
                    title: data.snippet.title,
                    url: 'https://www.youtube.com/channel/' + data.id,
                    subscribers: data.statistics.subscriberCount,
                    thumbnail: data.snippet.thumbnails.default,
                }
            } catch (err) {
                success = false
                console.log('Could not find channel with id', id)
            }
        })
        res.json({items: await Promise.all(bestInfo), success: success})
    }
}

module.exports = TopChannelsController
