import React, {} from 'react';
import SearchResults from "./SearchResults"
import { SearchListRoot } from '..';

let searchInput = new URLSearchParams(window.location.search).get('search') || '';
let sortInput = new URLSearchParams(window.location.search).get('sortBy') || 'A-Z';

//update() get's called on page load by SearchBar, when the search bar input is updated, when the sort list updated, or when the page is updated.
//update() renders the list of event data based on the search query 
export function update(){
    setTimeout(function(){
        SearchListRoot.render(
            <SearchResults searchInput={searchInput} sortInput={sortInput}/>
        );
    }, 100);
}

const SearchBar = () => {
    update();
    return (
        <center>
            <img alt="logo" width="500px" src='./logo.png' />
            <h3>Type below to search for events</h3>
            <h2><label for="inputbar">Search: </label>
            <input type="text" id="inputbar" onChange={(event) => {searchInput=event.currentTarget.value; update();}} defaultValue={searchInput}></input>
            <label for="sort"> &nbsp; &nbsp; &nbsp; Sort: </label>
            <select id="sort" onChange={(event) => {sortInput=event.currentTarget.value; update();}} defaultValue={sortInput}>
                <option value="A-Z">A-Z</option>
                <option value="Z-A">Z-A</option>
                <option value="DateAscending">Date Ascending</option>
                <option value="DateDescending">Date Descending</option>
            </select></h2>
        </center>
    );
}
  
  export default SearchBar;