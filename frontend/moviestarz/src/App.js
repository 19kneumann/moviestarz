import './App.css';
import React from "react"
import StartPage from "./Pages/StartPage"
import AccountPage from "./Pages/AccountPage"
import Nav from "./Components/Nav"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import WatchlistPage from "./Pages/WatchlistPage"
import FeedPage from "./Pages/FeedPage"
import HomePage from "./Pages/HomePage"

function App() {
  return (
    <div> 
    <Router>
    <Nav/>
    <Switch>
      <Route exact path="/" component={StartPage} />
      <Route path="/home" component={HomePage} />
      <Route path="/feed" component={FeedPage} />
      <Route path="/watchlists" component={WatchlistPage} />
      <Route path="/account" component={AccountPage} />
    </Switch>
  </Router>
  </div>

  );
}

export default App;
