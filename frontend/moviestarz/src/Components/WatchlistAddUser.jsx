import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import { DropdownButton, Dropdown } from "react-bootstrap";
class WatchlistAddUser extends Component {

  state = {
    isPublic: null,
    id: null,
    title: null,
    rating: null,
    description: null,
    isAdmin: true,
    show: true,
    user: null,
    friends: []
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
                {/* <input type="text" name="user" onChange={this.onChange} />
                <select id="user" name="user" onChange={this.onChange} >
                {this.props.friends.map((friend) => (                    
                    <option value={friend}>{friend}</option>
                  ))}
                </select> */}
                
                <DropdownButton title="add..." id="usernameSelect" name="usernameSelect" onClick={(e) => e.stopPropagation()} size="sm" variant="dark" >
                  <Dropdown.Header></Dropdown.Header>

                  {this.props.friends.map((friend) => (
                    // <Dropdown.Item as="button" onClick={() =>this.setState({watchlistId: watchlist.watchlistId}) }>{watchlist.watchlistTitle}</Dropdown.Item>
                    <Dropdown.Item onClick={(e) => { this.setState({user: friend}) }}>{friend}</Dropdown.Item>
                  ))}
                </DropdownButton>
                {this.state.user &&
                  <p> You are adding {this.state.user} as {this.state.isAdmin.toString() === "true" ? "an Admin": "a Viewer"} to '{this.props.title}' </p>
                }
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