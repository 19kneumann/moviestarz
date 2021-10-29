import React, { Component } from "react";
import StartPage from "./StartPage"
import AccountPage from "./AccountPage"
import Nav from "../Components/Nav"
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import WatchlistPage from "./WatchlistPage"
import FeedPage from "./FeedPage"
import HomePage from "./HomePage"

class MasterPage extends Component {

    state ={
        loggedIn: null,
        ownerUsername: null
    }
    // logIn(){
    //     console.log("testing")
    //     this.setState({
    //         loggedIn: true
    //     });
    //     console.log(this.state.loggedIn)
    // }



  render() {
      return (
        <div> 
        {this.props.cookies.ownerUsername ? 
            <Router>
            <Nav/>
            <Switch>
              {/* <Route exact path="/" component={<StartPage logIn={this.logIn.bind()}/>} /> */}
              <Route path="/home" component={() => (<HomePage cookies={this.props.cookies}/>)}/>
              {/* component={}  */}
              <Route path="/feed" component={() => (<FeedPage cookies={this.props.cookies}/>)} />
              <Route path="/watchlists" component={() => (<WatchlistPage cookies={this.props.cookies}/>)} />
              <Route path="/account" component={() => (<AccountPage cookies={this.props.cookies} removeCookies={this.props.removeCookies} />)} />
            </Switch>
          </Router>
        :
        <StartPage logIn={this.props.logIn}/>}
        
  </div>
    );
  }
}

export default MasterPage;