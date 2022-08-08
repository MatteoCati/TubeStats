import React, {useState} from 'react';
import "./SearchChannel.css";
import SearchIcon from "../svgs/search-icon.svg";
import { Link } from 'react-router-dom'

const SearchChannel = () => {

    const [searchValue, setSearchValue] = useState('');
    const [channelList, setChannelList] = useState([]);
    const [searchDone, setSearchDone] = useState(false);
    const [loading, setLoading] = useState(false)
    console.log(channelList)
    const handleChange = ({target}) => {
        setSearchValue(target.value)
    } 

    const handleSearch = () => {
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

    const handleEnter = (ev) => {
        if(ev.keyCode === 13) handleSearch()
    }

    const showNoResultMessage = channelList.length === 0 && searchDone && !loading
    const showStartSearchMessage = channelList.length === 0 && !searchDone && !loading

    return (
        <div className="pages">
            <div className="searchBarContainer">
                <input 
                    type="text" 
                    placeholder="Search Channel..." 
                    className="searchBar" 
                    onChange={handleChange} 
                    value={searchValue}
                    onKeyDown={handleEnter}
                />
                <img  onClick={handleSearch} src={SearchIcon} alt="" className="searchIcon"/>
            </div>
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