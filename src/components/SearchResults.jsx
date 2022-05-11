import React,{useState, useEffect} from 'react'
import { update } from './SearchBar.jsx';
import '../App.css';

let queryParams = new URLSearchParams(window.location.search);

//Changes the parameters in the client's URL when search query is updated
function updateURL(parameter, argument, searchInput, sortBy){
    if(searchInput !== new URLSearchParams(window.location.search).get('search')){
        queryParams.set('pageNumber', 1);
    }
    queryParams.set('sortBy', sortBy);
    queryParams.set(parameter, argument);
    window.history.replaceState(null, null, "?"+queryParams.toString());
}

//Displays loading icons for 1.5 seconds
const LoadingIcon = (searchInput) => {
    const [loadingMessage, setLoadingMessage] = useState(<><div id="SmallLoadingImage" class="smallLoader"></div>
                                                            <br></br>
                                                            <h2 id="searchingMessage">Searching...</h2></>);
    setTimeout(() => {
        setLoadingMessage(<><h2>Unable to find results for "{searchInput.searchInput}"</h2></>);
    }, 1550)
    return(
        <>
            {loadingMessage}
        </>
    )
}

const SearchResults = (searchValues) => {
    let searchInput = searchValues.searchInput;
    let sortBy = searchValues.sortInput;

    let pageNum = queryParams.get('pageNumber') !== null ? queryParams.get('pageNumber') : 1;
    updateURL("search", searchInput, searchInput, sortBy);

    //Requests searchData from the SQL Database given the search parameters. This request returns a list of up to 10 event data
    //searchData = [{id: str, title: str, startDate: str, endDate: str, count: int}]
    const [searchData, setItem] = useState([]);
    useEffect(()=>{
        fetch("https://brandonhalig.com/php/eventdata.php?search=" + searchInput + "&sortBy=" + sortBy + "&pageNumber=" + pageNum)
        .then(response => response.json())
        .then( result => setItem(result.data))
    },[searchInput, sortBy, pageNum]);
    
    let leftButton, rightButton;

    //Display loading icon until fetch request searchData is returned with data
    //If fetch request recieves no data after 2 seconds, it displays that no results were found
    if(searchData.length === 0){
        return(
            <div className="App">
                <br></br>
                <center>
                    <LoadingIcon searchInput={searchInput} />
                </center>
            </div>
        );
    }

    //Display back and forward buttons only if the next page exists
    let maxPages = Math.ceil(searchData[0].count/10);
    if (parseInt(pageNum) > 1){
        leftButton = <button type="button" class="pageButtons" id="left" onClick={() => {
            updateURL("pageNumber", parseInt(pageNum)-1, searchInput, sortBy);
            update();
        }}>←</button>
    }
    if (parseInt(pageNum) < maxPages){
        rightButton = <button type="button" class="pageButtons" id="right" onClick={() => {
            updateURL("pageNumber", parseInt(pageNum)+1, searchInput, sortBy);
            update();
        }}>→</button>
    }

    //Displays a table of up to 10 search results with back and forward buttons
    return (
        <div>
            <center>
                <h2>Page {pageNum}/{maxPages}</h2>
                {leftButton}{rightButton}
                <table style={{paddingLeft: "10%", paddingRight: "10%", width: "65%"}} id="eventsTable">
                {searchData.map(event => (
                    <tr class="eventsTable" key={event.id}><h5><a style={{fontSize:25}} href={"/event?eventId="+event.id} target="_blank" rel="noopener noreferrer">{event.title}</a> 
                    <br></br> Start Date: {event.startDate} | End Date: {event.endDate}</h5></tr>
                ))}
                </table>
            </center>
            <br></br><br></br><br></br><br></br>
        </div>
    )
}

export default SearchResults