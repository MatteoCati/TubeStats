export const formatNumber = (num) => {
    return num.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
}

export const formatDate = (date) => {
    const year = date.slice(0, 4)
    const month = parseInt(date.slice(5, 7))
    const day = date.slice(8, 10)
    const allMonths = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ]
    return day + ' ' + allMonths[month - 1] + ' ' + year
}

export const formatShortDate = (date) => {
    const year = date.slice(0, 4)
    const month = parseInt(date.slice(5, 7))
    const day = date.slice(8, 10)

    return day + '/' + month + '/' + year
}

export const truncateText = (text, length) => {
    const splitted = text.trim().split(/\s+/)

    if (splitted.length === 0) {
        return ''
    }

    let truncatedText = splitted[0]
    let i = 1
    while (i < splitted.length && truncatedText.length < length) {
        truncatedText += ' ' + splitted[i]
        i += 1
    }

    return truncatedText
}

export const formatDuration = (duration) => {
    const hours = Math.floor(duration / 3600)
    const left = duration - hours * 3600
    const minutes = Math.floor(left / 60)
    console.log(minutes)
    const seconds = left - minutes * 60
    let result = ':' + (seconds < 10 ? '0' : '') + seconds
    //console.log(result)
    result =
        hours > 0
            ? minutes < 10
                ? hours + ':0' + minutes + result
                : hours + ':' + minutes + result
            : minutes + result
    console.log(duration, result)
    return result
}
