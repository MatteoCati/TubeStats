export const formatNumber = (num) => {
    return num.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    
}

export const truncateText = (text, length) => {

    const splitted=text.trim().split(/\s+/)

    if(splitted.length === 0){
        return '';
    }

    let truncatedText = splitted[0];
    let i =1;
    while(i < splitted.length && truncatedText.length < length){
        truncatedText += ' ' + splitted[i];
        i += 1
    }

    return truncatedText;
}