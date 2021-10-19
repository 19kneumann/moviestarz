import React, { Component } from "react";

class SignUp extends Component {



  render() {
    return (
      <div>
        <h1> SIGN UP </h1>
        <form onSubmit={this.props.SignUp}>
              <label>Username</label>
              <br/>
              <input type="text" name="username"/>
              <br/>
              <label>Password</label>
              <br/>
              <input type="password" name="password"/>
              <br/>
              <label>Confirm Password</label>
              <br/>
              <input type="password"/>
              <br/>
              <label>Email</label>
              <br/>
              <input type="text" name="email"/>
              <button type="Submit">Create an Account</button>
        </form>
      </div>
    );
  }
}

export default SignUp;