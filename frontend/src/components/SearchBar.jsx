import React from "react";
import SearchIcon from "../svgs/search-icon.svg";

import './SearchBar.css'

const SearchBar = ({containerClass, handleSearch, placeholder, searchHook}) => {

    const [searchValue, setSearchValue] = searchHook;

    const handleChange = ({target}) => {
        setSearchValue(target.value)
    } 

    const handleEnter = (ev) => {
        if(ev.keyCode === 13) handleSearch(searchValue)
    }

    return (
        <div className={"searchBarContainer "+containerClass}>
            <input 
                type="text" 
                placeholder={placeholder || "Search Channel..." }
                className="searchBar" 
                onChange={handleChange} 
                value={searchValue}
                onKeyDown={handleEnter}
            />
            <img  onClick={() =>handleSearch(searchValue)} src={SearchIcon} alt="" className="searchIcon"/>
        </div>
    )
}

export default SearchBar