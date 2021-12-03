import React, { Component } from "react";

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
        <h1>WELCOME TO MOVIESTARZ!!</h1>
        
      </div>
    );
  }
}

export default StartPage;