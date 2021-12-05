import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
import axios from "axios";

class SignUp extends Component {

  state = {
    show: null,
    username: null,
    password: "",
    email: null,
    error: false,
    errorMessage: "",
    passwordCheck: ""
  }

  onChange = (evt) => {
    this.setState({
      error: false,
      [evt.target.name]: evt.target.value,
    },
      this.checkRegex
    );
  };

  checkRegex() {
    const password_pattern = /(?=.*[A-Z])(?=.*[\d])(?=.*[!@#$%^&*()\[\]{};:'"<>,.\/?])[\w\W]{8,}/;
    const email_pattern = /.*\w.*\w.*@.*\w.*\w.*[.].*\w.*\w.*/i;

    console.log(this.state.password)
    console.log(this.state.passwordCheck)

    if (!password_pattern.test(this.state.password)) {
      this.setState({ error: true, errorMessage: "password needs to be  at least 8 characters and include one capitalized letter, one digit, and one special character !@#$%^&*()[]{};:'\"<>,./?.<br />" });
    }
    else if (this.state.password != (this.state.passwordCheck)) {
      this.setState({ error: true, errorMessage: "passwords must match" });
    } else if (!email_pattern.test(this.state.email)) {
      this.setState({ error: true, errorMessage: "email have at least two characters, followed by an '@', then at least two characters, followed by a dot, and then at least two more characters.<br />" });
    } else {
      this.setState({
        error: false
      })
    }
  }

  closeModal() {
    this.setState({ show: false });
    this.props.closeModal();
  }
  componentWillMount() {
    this.setState({ show: this.props.show, error: this.props.error })
  }

  SignUp(username, password, email) {
    var self = this;
    axios
      .post("http://localhost:8089/user-service", {
        username: `${username}`,
        password: `${password}`,
        email: `${email}`,
      })
      .then((response) => {
        console.log(response.data);
        self.closeModal();
        self.props.logIn(self.state.username, self.state.password)
      })
      .catch(function (error) {
        console.log(error);
        self.setState({
          error: true
        })
        console.log("AHHHH")
      })
  }


  render() {
    return (
      <div>
        <Modal show={this.state.show} backdrop="static" className="ModalContainer" centered animation={false}>
          <div className="ModalContent">
            <ModalHeader>
              <h1> SIGN UP </h1>
            </ModalHeader>
            <Modal.Body>
              <form onSubmit={this.props.SignUp}>
                <label>Username</label>
                <br />
                <input type="text" name="username" onChange={this.onChange} />
                <br />
                <label>Password</label>
                <br />
                <input type="password" name="password" onChange={this.onChange} />
                <br />
                <label>Confirm Password</label>
                <br />
                <input type="password" name="passwordCheck" onChange={this.onChange} />
                <br />
                <label>Email</label>
                <br />
                <input type="text" name="email" onChange={this.onChange} />
              </form>
            </Modal.Body>
            <Modal.Footer>
              {this.state.error &&
                <React.Fragment>
                  <p>{this.state.errorMessage}</p>
                </React.Fragment>
              }
              {this.props.usernameTaken &&
                <React.Fragment>
                  <p>The name {this.state.username} is already taken. Please try again!</p>
                  {/* <p>{this.state.errorMessage}</p> */}
                </React.Fragment>
              }
              <button onClick={() => this.SignUp(this.state.username, this.state.password, this.state.email)} disabled={this.state.error}>Create Account</button>
              <button onClick={() => this.closeModal()}>Close</button>
            </Modal.Footer>
          </div>
        </Modal>
      </div>
    );
  }
}

export default SignUp;