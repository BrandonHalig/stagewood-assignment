import React,{useState, useEffect} from 'react'
import '../App.css';

let eventId = new URLSearchParams(window.location.search).get('eventId');

const EventCard = () => {

    //Gets the events picture URL, start date, end date, and title from the sql database
    //eventData = [{title: str, startDate: str, endDate: str, source: str}]
    const [eventData, setItem] = useState([]);
    useEffect(()=>{
        fetch("https://brandonhalig.com/php/eventdata.php?eventId="+eventId)
        .then(res => res.json())
        .then((result)=>{setItem(result.data)})
    },[eventId]);

    //Updates outputData which will be either event card Data and images or a loading icon if it is waiting for eventData 
    let outputData, loadingText;
    if(eventData[0] !== undefined){
        //outputData contains the html with the events images, title, and dates
        outputData = <div className='eventCard'><br></br>
                        <script>
                            {document.title=eventData[0].title}
                        </script>
                        {eventData.map(event => (
                            //Displays events images, If event doesn't have an image link, it displays imgnotfound.jpg
                            //If event image URL link returns 404, image is displayed as noimage.png
                            event.source !== null ? <img height="250" src={event.source.replace(/\\/g, '')} alt={eventId} onError={event => {event.target.src = "imgnotfound.jpg"; event.onerror = null}}></img> : eventData[0].source === null ? <img height="250" src="noimage.png" alt={eventId}></img> : null
                        ))}
                        <h1>{eventData[0].title}</h1><h3>Start Date: {eventData[0].startDate} <br></br> End Date: {eventData[0].endDate}</h3>
                     </div>
    }else{
        //outputData is a loading icon while waiting for fetch eventData
        outputData = <div className='eventCard'>
                        <div id="LoadingImage" class="largeLoader"></div><br></br>
                        <h2 id="LoadingText">Loading...</h2>
                     </div>
    }

    //Displays event card with event's image, title and dates 
    return (
        <div className="App">
            <br></br><br></br>
            <center>
                {outputData}
            </center>
            <br></br>
            {loadingText}
            <script>
                {setTimeout(() => {
                    try{
                        document.getElementById("LoadingImage").className = "noImage";
                        document.getElementById("LoadingText").innerText = "";
                    }catch{}
                }, 2500)}
            </script>
        </div>
    )
}

export default EventCard;