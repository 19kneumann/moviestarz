import React, { Component } from "react";
import Login from "../Components/Login";
import SignUp from "../Components/SignUp";
import axios from "axios";
import { Alert } from "react-bootstrap";

class StartPage extends Component {
  state = {
    logIn: false,
    signUp: false,
    usernameTaken: false
  }

  constructor() {
    super();
    this.closeModal = this.closeModal.bind(this);
    this.logIn = this.logIn.bind(this);
    // this.SignUp = this.SignUp.bind(this);
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

  render() {
    return (
      <div>
        HEHEHEHEHEHE
      </div>
    );
  }
}

export default StartPage;