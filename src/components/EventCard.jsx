import React,{useState, useEffect} from 'react'
import '../App.css';

let eventId = new URLSearchParams(window.location.search).get('eventId');

//Displays loading icons for 2.5 seconds
const LoadingCard = () => {
    const [loadingMessage, setLoadingMessage] = useState(<><div id="LoadingImage" class="largeLoader"></div><br></br>
                                                         <h2 id="LoadingText">Loading...</h2></>);
    setTimeout(() => {
        setLoadingMessage(<><h2 id="LoadingText">Event ID: {eventId} <br></br> does not exist</h2></>);
    }, 2500)
    return(
        <>
            {loadingMessage}
        </>
    )
}

const EventCard = () => {

    function getEventImage(event){
        try{
            //Displays events images, If event doesn't have an image link, it displays imgnotfound.jpg
            //If event image URL link returns 404, image is displayed as noimage.png
            return event.source !== null ? <img height="250" src={event.source.replace(/\\/g, '')} alt={eventId} onError={event => {event.target.src = "imgnotfound.jpg"; event.onerror = null}}></img> : 
                                    eventData[0].source === null ? <img height="250" src="noimage.png" alt={eventId}></img> : null
        }catch{
            return <img height="250" src="noimage.png" alt={eventId}></img>
        }
    }

    const [curImage, setImage] = useState();
    const [curImageNum, setCurImageNum] = useState(0);

    //Gets the events picture URL, start date, end date, and title from the sql database
    //eventData = [{title: str, startDate: str, endDate: str, source: str}]
    const [eventData, setEventData] = useState([]);
    useEffect(()=>{
        fetch("https://brandonhalig.com/php/eventdata.php?eventId="+eventId)
        .then(response => response.json())
        .then(result => {
            setEventData(result.data);
            setImage(getEventImage(result.data[0]));
        });
    }, [eventId]);

    //Updates outputData which will be either event card Data and images or a loading icon if it is waiting for eventData 
    let outputData;
    if(eventData[0] !== undefined){

        let eventImages = eventData.map(event => getEventImage(event));

        let buttons = eventImages.length <= 1 ? null :
                        <>
                            <h4>{curImageNum+1} / {eventImages.length}</h4>
                            <button type="button" class="pageButtons" id="left" onClick={() => {setCurImageNum(curImageNum-1 < 0 ? eventImages.length-1 : curImageNum-1); 
                                                                                                setImage(eventImages[curImageNum-1 < 0 ? eventImages.length-1 : curImageNum-1])}}>←</button>
                            <button type="button" class="pageButtons" id="Right" onClick={() => {setCurImageNum(curImageNum+1 > eventImages.length-1 ? 0 : curImageNum+1); 
                                                                                                setImage(eventImages[curImageNum+1 > eventImages.length-1 ? 0 : curImageNum+1])}}>→</button>
                        </>

        //outputData contains the html with the events images, title, and dates
        outputData = <><br></br>
                        <script>
                            {document.title=eventData[0].title}
                        </script>
                        {curImage}
                        <br></br>
                        {buttons}

                        <h1>{eventData[0].title}</h1><h3>Start Date: {eventData[0].startDate} <br></br> End Date: {eventData[0].endDate}</h3>
                        <br></br>
                     </>
    }else{
        //outputData is a loading icon while waiting for fetch eventData
        outputData = <LoadingCard />;
    }

    //Displays event card with event's image, title and dates 
    return (
        <center><br></br><br></br>
            <div className='eventCard'>
                {outputData}
            </div>
        </center>
    )
}

export default EventCard;