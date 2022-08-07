const setParams = (parts, others) => {
    var params = new URLSearchParams()
    parts.forEach((element) => {
        params.append('part', element)
    })
    Object.keys(others).forEach((key) => {
        params.append(key, others[key])
    })
    params.append('key', process.env.YOUTUBE_API_KEY)

    return params
}

module.exports = {
    setParams,
}
