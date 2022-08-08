import React, {useEffect, useState} from 'react';
import "./SearchChannel.css";

import { Link } from 'react-router-dom'
import SearchBar from '../components/SearchBar'

const SearchChannel = ({searchHook}) => {
    const [channelList, setChannelList] = useState([]);
    const [searchDone, setSearchDone] = useState(false);
    const [loading, setLoading] = useState(false)

    const handleSearch = (searchValue) => {
        if(loading) return
        setLoading(true)
        fetch('/api/search?key='+searchValue)
            .then(res => res.json())
            .then(data => {
                setChannelList(data)
                setLoading(false)
            })
            .catch(err => {
                console.log(err)
                setLoading(false)
            })
        setSearchDone(true)
    }

    useEffect(() => {
        const [searchValue, setSearchValue] = searchHook
        if(searchValue){
            handleSearch(searchValue)
        }
    }, [])

    const showNoResultMessage = channelList.length === 0 && searchDone && !loading
    const showStartSearchMessage = channelList.length === 0 && !searchDone && !loading

    return (
        <div className="pages">
            <SearchBar handleSearch={handleSearch} searchHook={searchHook} containerClass="searchBarPosition"/>
            {channelList.length > 0 && channelList.map(({snippet}, idx) => (
                <Link style={{gridRow: idx+2}} key={snippet.channelId} className="searchResultContainer" to={'/search/'+snippet.channelId}>
                    <img alt="Channel avatar" src={snippet.thumbnails.default.url} className="avatar"/>
                    <p>{snippet.channelTitle}</p>
                </Link>
            ))}
            {showNoResultMessage && <div className='noResultContainer'>No result found, try again...</div>}
            {showStartSearchMessage && <div className='noResultContainer'>Search a channel name...</div>}

        </div>
    )
}

export default SearchChannel;