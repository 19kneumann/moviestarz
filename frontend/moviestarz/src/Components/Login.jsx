import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import ModalHeader from "react-bootstrap/esm/ModalHeader";

class Login extends Component {


  state = {
    show: null,
    username: null,
    password: null,
    error: null
  }

  onChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  };

  closeModal() {
    this.setState({ show: false });
    this.props.closeModal();
  }
  
  componentWillMount(){
    this.setState({show: this.props.show})
  }

  render() {
    return (
      <div>
        <Modal show={this.state.show} backdrop="static" className="ModalContainer" centered animation={false}>
          <div className="ModalContent">
            <ModalHeader>
              <h1> LOG IN </h1>
            </ModalHeader>
            <Modal.Body>
              <form onSubmit={this.props.logIn}>
                <label>Username</label>
                <br />
                <input type="text" name="username" onChange={this.onChange} />
                <br />
                <label>Password</label>
                <br />
                <input type="password" name="password" onChange={this.onChange} />
              </form>
            </Modal.Body>
            <Modal.Footer>
              <button onClick={() => this.props.logIn(this.state.username, this.state.password)}>Log In </button>
              <button onClick={() => this.closeModal()}>Close</button>
            </Modal.Footer>
          </div>
        </Modal>
      </div>
    );
  }
}

export default Login;