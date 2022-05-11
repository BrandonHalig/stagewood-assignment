import React from 'react';
import './App.css';
import EventCard from './components/EventCard.jsx';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SearchBar from './components/SearchBar.jsx';

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
