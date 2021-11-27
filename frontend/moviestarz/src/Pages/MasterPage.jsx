import React, { Component } from "react";
import StartPage from "./StartPage"
import AccountPage from "./AccountPage"
import Nav from "../Components/Nav"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import WatchlistPage from "./WatchlistPage"
import FeedPage from "./FeedPage"
import HomePage from "./HomePage"
import Login from "../Components/Login";
import SignUp from "../Components/SignUp";
class MasterPage extends Component {


  constructor() {
    super();
    this.closeModal = this.closeModal.bind(this);
    this.logIn = this.logIn.bind(this);
    this.openModal = this.openModal.bind(this);
    // this.SignUp = this.SignUp.bind(this);
  }

  state = {
    logIn: null,
    ownerUsername: null,
    signUp: null,
    usernameTaken: false

  }

  closeModal() {
    this.setState({
      logIn: false,
      signUp: false
    })
  }

  logIn(username, password) {
    this.props.logIn(username, password)
  }

  openModal(type) {
    if (type === "Login") {
      this.setState({ logIn: true })
    }else{
      this.setState({ signUp: true })
    }
  }

  render() {
    return (
      <div>
        {this.props.cookies.ownerUsername ?
          <Router>
            <Nav cookies={this.props.cookies} removeCookies={this.props.removeCookies}/>
            <Switch>
              {/* <Route exact path="/" component={<StartPage logIn={this.logIn.bind()}/>} /> */}
              <Route exact path="/" component={() => (<HomePage cookies={this.props.cookies}  />)} />
              {/* component={}  */}
              <Route path="/feed" component={() => (<FeedPage cookies={this.props.cookies} />)} />
              <Route path="/watchlists" component={() => (<WatchlistPage cookies={this.props.cookies} />)} />
              <Route path="/account" component={() => (<AccountPage cookies={this.props.cookies} removeCookies={this.props.removeCookies}  />)} />
            </Switch>
          </Router>
          :
          <div>
            <Nav cookies={this.props.cookies} openModal={this.openModal.bind()} />
            {this.state.logIn === true &&
              <Login logIn={this.logIn.bind()} show={this.state.logIn} closeModal={this.closeModal.bind()} errorMessage={this.props.errorMessage} ></Login>
            }
            {this.state.signUp === true &&
              <SignUp show={this.state.signUp} closeModal={this.closeModal.bind()} error={this.state.usernameTaken} logIn={this.logIn.bind()}></SignUp>
            }
            <StartPage logIn={this.props.logIn} />
          </div>
        }
      </div>
    );
  }
}

export default MasterPage;