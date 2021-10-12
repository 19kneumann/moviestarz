import React, { Component } from "react";
import Login from "../Components/Login";
import SignUp from "../Components/SignUp";

class StartPage extends Component {

  render() {
    return (
      <div>
        {/* <button onClick={this.handleLogin}> Login </button>  */}
        <Login></Login>
        <SignUp></SignUp>
      </div>
    );
  }
}

export default StartPage;