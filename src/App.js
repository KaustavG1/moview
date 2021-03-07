import React from 'react';
import './App.css';
// import Navbar from './Components/Navbar/Navbar';
import Navbar from './Components/Navbar/Navbar';
import ListHolder from './Components/ListPage/ListHolder';
import DetailTile from './Components/DetailPage/DetailTile';
import { Switch, Route } from 'react-router-dom';
import { useState } from 'react';

const API_CONSTS = ["1ab924a0", "http://www.omdbapi.com/"];

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  function getSearchTerm(data) {
    setSearchTerm(data);
  }

  return (
    <div className="App">
      <Navbar passSearchTerm={getSearchTerm} apiURL={API_CONSTS[1]} />
      <Switch>
        <Route exact path="/" render={() => <ListHolder searchTerm={searchTerm} apiKey={API_CONSTS[0]} apiURL={API_CONSTS[1]} apiKey={API_CONSTS[0]} />} />
        <Route exact path="/:movieID" render={routeProps => <DetailTile apiURL={API_CONSTS[1]} apiKey={API_CONSTS[0]} {...routeProps} />} />
        <Route render={() => <h1 id="error-message">Error 404: Page not found</h1>} />
      </Switch>
    </div>
  );
}

export default App;
