import React, { Component } from "react";
class Login extends Component {

    onLoginClick = (event) => {
      console.log("ahh");
  };

  render() {
    return (
      <div>
        <h1> LOG IN </h1>
        <form>
              <label>Username or Email</label>
              <br/>
              <input type="text"/>
              <br/>
              <label>Password</label>
              <br/>
              <input type="password"/>
        </form>
        <button onClick={this.onLoginClick}> Log In </button> 
      </div>
    );
  }
}

export default Login;