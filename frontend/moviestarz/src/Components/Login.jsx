import React, { Component } from "react";

class Login extends Component {

  render() {
    return (
      <div>
        <h1> LOG IN </h1>
        <form onSubmit={this.props.logIn}>
              <label>Username</label>
              <br/>
              <input type="text" name="username"/>
              <br/>
              <label>Password</label>
              <br/>
              <input type="password" name="password"/>
              <button type="submit"> Log In</button>
        </form>
      </div>
    );
  }
}

export default Login;