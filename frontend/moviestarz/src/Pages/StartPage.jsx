import React, { Component } from "react";
import Login from "../Components/Login";
import SignUp from "../Components/SignUp";
import axios from "axios";

class StartPage extends Component {
  SignUp = (e) =>
  {
    console.log(e)
    axios
          .post("http://localhost:8089/user-service", {
            username: `${e.target.username.value}`,
            password: `${e.target.password.value}`,
            email: `${e.target.email.value}`,
          })
          .then((response) => {
            console.log(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });
  } 

  


  render() {
    return (
      <div>
        {/* <button onClick={this.handleLogin}> Login </button>  */}
        <Login logIn={this.props.logIn}></Login>
        <SignUp SignUp={this.SignUp.bind()}></SignUp>
      </div>
    );
  }
}

export default StartPage;