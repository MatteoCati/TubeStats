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
