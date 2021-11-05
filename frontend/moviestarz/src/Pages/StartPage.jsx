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
        {/* <button onClick={this.handleLogin}> Login </button>  */}
        <button onClick={() => this.setState({ logIn: true })}>Login</button>
        {this.state.logIn === true &&
          <Login logIn={this.logIn.bind()} show={this.state.logIn} closeModal={this.closeModal.bind()}></Login>
        }

        <button onClick={() => this.setState({ signUp: true })}>Create an Account</button>
        {this.state.signUp === true &&
          <SignUp show={this.state.signUp} closeModal={this.closeModal.bind()} error={this.state.usernameTaken}></SignUp>
        }
      </div>
    );
  }
}

export default StartPage;