import React, { Component } from "react";
import { Modal } from "react-bootstrap";
class WatchlistAddUser extends Component {

  state = {
    isPublic: null,
    id: null,
    title: null,
    rating: null,
    description: null,
    isAdmin: null,
    show: true
  };

  onChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  };

  closeModal() {
    this.setState({ show: false });
    this.props.closeModal();
  }

  render() {
    return (
      <div>
        <Modal show={this.state.show} backdrop="static" className="ModalContainer" centered animation={false}>
          <div className="ModalContent">
              <h1> ADD USER </h1>
            <Modal.Body>
              <form onSubmit={this.props.addUser}>
                <input type="text" name="id" value={this.props.id} readOnly />
                <br />
                <label>Permissions</label>
                <br />
                <select id="isAdmin" name="isAdmin" onChange={this.onChange} >
                  <option value="true">Admin</option>
                  <option value="false">Viewer</option>
                </select>
                <br />
                <label>Username</label>
                <br />
                <input type="text" name="user" onChange={this.onChange} />
                <br />
              </form>

            </Modal.Body>
            <Modal.Footer>
              <button onClick={() => this.props.addUser(this.props.id, this.state.isAdmin, this.state.user)}>Submit </button>
              <button onClick={() => this.closeModal()}>Close</button>
            </Modal.Footer>
          </div>
        </Modal>
      </div>
    );
  }
}

export default WatchlistAddUser;