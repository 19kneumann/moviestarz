import React, { Component } from "react";
class SignUp extends Component {

  render() {
    return (
      <div>
        <h1> SIGN UP </h1>
        <form>
              <label>Username</label>
              <br/>
              <input type="text"/>
              <br/>
              <label>Password</label>
              <br/>
              <input type="password"/>
              <br/>
              <label>Confirm Password</label>
              <br/>
              <input type="password"/>
              <br/>
              <label>Email</label>
              <br/>
              <input type="text"/>
        </form>
        <button>Sign Up</button>
      </div>
    );
  }
}

export default SignUp;