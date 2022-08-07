import React, {useState} from 'react';
import "./SearchChannel.css";
import SearchIcon from "../svgs/search-icon.svg";

const SearchChannel = () => {

    const [searchValue, setSearchValue] = useState('');

    const handleChange = ({target}) => {
        setSearchValue(target.value)

    } 

    const handleSearch = () => {
        console.log(searchValue)
    }

    const handleEnter = (ev) => {
        if(ev.keyCode === 13) handleSearch()
    }

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
            

        </div>
    )
}

export default SearchChannel;