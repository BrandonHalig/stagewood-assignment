import React,{useState, useEffect} from 'react'
import { update } from '../App';
import '../App.css';

let queryParams = new URLSearchParams(window.location.search);

//Changes the parameters in the client's URL when search query is updated
function updateURL(parameter, argument){
    if(document.getElementById('inputbar').value !== new URLSearchParams(window.location.search).get('search')){
        queryParams.set('pageNumber', 1);
    }
    queryParams.set('sortBy', document.getElementById('sort').value);
    queryParams.set(parameter, argument);
    window.history.replaceState(null, null, "?"+queryParams.toString());
}

const SearchResults = () => {
    let sortBy = document.getElementById('sort').value;
    let pageNum = queryParams.get('pageNumber') !== null ? queryParams.get('pageNumber') : 1;
    updateURL("search", document.getElementById('inputbar').value);

    //Requests searchData from the SQL Database given the search parameters. This request returns a list of up to 10 event data
    //searchData = [{id: str, title: str, startDate: str, endDate: str, count: int}]
    const [searchData, setItem] = useState([]);
    useEffect(()=>{
        fetch("https://brandonhalig.com/php/eventdata.php?search=" + document.getElementById('inputbar').value + "&sortBy=" + sortBy + "&pageNumber=" + pageNum)
        .then(res => res.json())
        .then((result)=>{setItem(result.data)})
    },[document.getElementById('inputbar').value, sortBy, pageNum]);
    
    let leftButton, rightButton;

    //Display loading icon until fetch request searchData is returned with data
    //If fetch request recieves no data after 2 seconds, it displays that no results were found
    if(searchData.length === 0){
        return(
            <div className="App">
                <br></br>
                <center>
                    <div id="SmallLoadingImage" class="smallLoader"></div>
                    <br></br>
                    <h2 id="searchingMessage">Searching...</h2>
                    <script>
                    {setTimeout(() => {
                        try{
                            document.getElementById("SmallLoadingImage").className = null;
                            document.getElementById("searchingMessage").innerText = 'Unable to find results for "' + document.getElementById('inputbar').value +'"';
                        }catch{}
                    }, 2000)}
                    </script>
                </center>
            </div>
        );
    }

    //Display back and forward buttons only if the next page exists
    let maxPages = Math.ceil(searchData[0].count/10);
    if (parseInt(pageNum) > 1){
        leftButton = <button type="button" class="pageButtons" id="left" onClick={() => {
            updateURL("pageNumber", parseInt(pageNum)-1);
            update();
        }}>←</button>
    }
    if (parseInt(pageNum) < maxPages){
        rightButton = <button type="button" class="pageButtons" id="right" onClick={() => {
            updateURL("pageNumber", parseInt(pageNum)+1);
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
                    <tr class="eventsTable" key={event.id}><h5><a style={{fontSize:25}} href={"/event?eventId="+event.id} target="_blank" rel="noopener noreferrer">{event.title}</a> <br></br> Start Date: {event.startDate} | End Date: {event.endDate}</h5></tr>
                ))}
                </table>
            </center>
            <br></br><br></br><br></br><br></br>
        </div>
    )
}

export default SearchResults