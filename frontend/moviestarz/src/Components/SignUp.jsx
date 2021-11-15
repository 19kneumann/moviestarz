import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
import axios from "axios";

class SignUp extends Component {

  state = {
    show: null,
    username: null,
    password: null,
    email: null,
    error: null
  }

  onChange = (evt) => {
    this.setState({
      error:null,
      [evt.target.name]: evt.target.value,
    });
  };

  closeModal() {
    this.setState({ show: false });
    this.props.closeModal();
  }
  componentWillMount() {
    this.setState({ show: this.props.show, error: this.props.error })
  }

  SignUp(username, password, email) {
    var self= this;
    axios
      .post("http://localhost:8089/user-service", {
        username: `${username}`,
        password: `${password}`,
        email: `${email}`,
      })
      .then((response) => {
        console.log(response.data);
        self.closeModal();
      })
      .catch(function (error) {
        console.log(error);
        self.setState({
          error: true
        })
        console.log("AHHHH")
      });
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
                <input type="password" />
                <br />
                <label>Email</label>
                <br />
                <input type="text" name="email" onChange={this.onChange} />
              </form>
            </Modal.Body>
            <Modal.Footer>
              {this.state.error &&
              <p>The name {this.state.username} is already taken. Please try again!</p>
              }
              <button onClick={() => this.SignUp(this.state.username, this.state.password, this.state.email)}>Create Account</button>
              <button onClick={() => this.closeModal()}>Close</button>
            </Modal.Footer>
          </div>
        </Modal>
      </div>
    );
  }
}

export default SignUp;