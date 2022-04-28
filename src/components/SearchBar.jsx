import React, {} from 'react';
import { update } from '../App';

const SearchBar = () => {
    setTimeout(() => {document.getElementById('inputbar').value = new URLSearchParams(window.location.search).get('search');
                      document.getElementById('sort').value = new URLSearchParams(window.location.search).get('sortBy') === '' ? 'A-Z' : new URLSearchParams(window.location.search).get('sortBy');
                      document.getElementById("sort").addEventListener("change", update);
                      document.addEventListener("keydown", update);
                      update()}, 0);
    return (
        <center>
            <img alt="logo" width="500px" src='./logo.png' />
            <h3>Type below to search for events</h3>
            <h2><label for="inputbar">Search: </label>
            <input type="text" id="inputbar"></input>
            <label for="sort">&nbsp; &nbsp; &nbsp; Sort: </label>
            <select id="sort">
                <option value="A-Z">A-Z</option>
                <option value="Z-A">Z-A</option>
                <option value="DateAscending">Date Ascending</option>
                <option value="DateDescending">Date Descending</option>
            </select></h2>
        </center>
    );
}
  
  export default SearchBar;