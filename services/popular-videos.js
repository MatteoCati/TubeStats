const {setParams} = require("../controllers/utils");
const axios = require("axios");

class PopularVideosService {
    async getPopularVideos(countrCode){
        const params = setParams(['snippet', 'statistics'], {
            maxResults: 10,
            chart: 'mostPopular',
            regionCode: countrCode,
        })

        const response = await axios.get(
            'https://youtube.googleapis.com/youtube/v3/videos',
            {params}
        )

        return response.data.items
    }
}

module.exports = PopularVideosService
