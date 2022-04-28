import React from 'react';
import './App.css';
import SearchResults from "./components/SearchResults.jsx"
import { SearchListRoot } from '.';
import EventCard from './components/EventCard.jsx';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SearchBar from './components/SearchBar.jsx';

let curSearch = '';
let curSort = 'A-Z';
let pageNum = new URLSearchParams(window.location.search).get('pageNumber') !== null ? new URLSearchParams(window.location.search).get('pageNumber') : 1;

//update() get's called on page load by SearchBar, when the search bar input is updated, when the sort list updated, or when the page is updated.
//update() renders the list of event data based on the search query 
export function update(){
    setTimeout(function(){
        if (document.getElementById('inputbar').value !== curSearch || curSort !== document.getElementById("sort").value || 
        (new URLSearchParams(window.location.search).get('pageNumber') !== pageNum && new URLSearchParams(window.location.search).get('pageNumber') !== null)){
            pageNum = new URLSearchParams(window.location.search).get('pageNumber') !== null ? new URLSearchParams(window.location.search).get('pageNumber') : 1;
            curSearch = document.getElementById('inputbar').value;
            curSort = document.getElementById("sort").value;
            SearchListRoot.render(
                <SearchResults />
            );
        }
    }, 100);
}

function App() {
    return (
        <div className="App">
            <Router>
                <Switch>
                <Route exact path = "/" component={SearchBar} />
                <Route exact path = "/event" component={EventCard} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
