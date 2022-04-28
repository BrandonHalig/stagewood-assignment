<?php
$servername = "localhost";
$username = "";
$password = "";
$dbname = "";

$conn = new mysqli($servername, $username, $password, $dbname);

$eventId = $_GET['eventId'];
$pageNum = $_GET['pageNumber'];
$sortBy = $_GET['sortBy'];
$search = $_GET['search'];

switch($sortBy){
    case "A-Z":
        $sortBy = 'ORDER BY title';
        break;
    case "Z-A":
        $sortBy = 'ORDER BY title DESC';
        break;
    case "DateAscending":
        $sortBy = 'ORDER BY startDate';
        break;
    case "DateDescending":
        $sortBy = 'ORDER BY startDate DESC';
        break;
    default:
        $sortBy = 'ORDER BY title';
}

//If eventId is used as a parameter, it means that the event card data is being requested
//otherwise, search results data is being requested
if ($eventId != null){
    $sql = "SELECT e.startDate, e.endDate, e.id, e.title, p.source, p.eventId FROM event e LEFT JOIN photo p ON p.eventId = e.id WHERE e.id = '" . $eventId . "'";
}else{
    $search = " '%" . str_replace(" ","%' AND title LIKE '%",$search). "%' ";
    $sql = "SELECT id, title, startDate, endDate, (select count(*) from (SELECT title FROM event WHERE title LIKE ".$search.") as a) as count
    FROM event WHERE title LIKE" . $search . $sortBy . " LIMIT " . 10*(intval($pageNum)-1) . ", 10";
}

$result = $conn->query($sql);

$eventNames = array();
while($row = $result->fetch_assoc()) {
    array_push($eventNames, $row);
}

//Echo the requested data as json
//jason.data = [{title: str, startDate: str, endDate: str, source: str}] for search results
//jason.data = [{id: str, title: str, startDate: str, endDate: str, count: str}] for event card
$eventObj = new stdClass();
$eventObj->data = $eventNames;
echo json_encode($eventObj);

$conn->close();
?>