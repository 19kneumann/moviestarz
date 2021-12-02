import React, { Component } from "react";
import Reviews from "../Components/Reviews";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import FriendIncomingRequests from "../Components/FriendIncomingRequests";
import FriendsList from "../Components/FriendsList";
class FeedPage extends Component {

  constructor() {
    super();
    this.search = this.search.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.sendResponse = this.sendResponse.bind(this);
    this.removeUser = this.removeUser.bind(this);
  }

  state = {
    showAdd: false,
    username: null,
    error: false,
    showIncoming: false,
    showFriendsList: false,
    pending: [],
    friends: []
  }
  addFriend() {
    this.setState({
      showAdd: true
    })
  }

  onChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  };

  closeModal() {
    this.setState({
      showAdd: false,
      error: false,
      showIncoming: false,
      showFriendsList: false
    })
  }

  search() {
    var self = this;
    axios
      .patch("http://localhost:8089/user-service/addFriend", {
        ownerUsername: `${this.props.cookies.ownerUsername}`,
        friendUsername: `${this.state.username}`,
      })
      .then((response) => {
        console.log(response.data);
        self.closeModal();
      })
      .catch(function (error) {
        console.log(error.response.data);
        self.setState({
          error: error.response.data
        })
      });
  }

  getPending() {
    var self = this;
    axios
      .get("http://localhost:8089/user-service/getPending/" + this.props.cookies.ownerUsername)
      .then((response) => {
        console.log(response.data);
        this.setState({
          pending: response.data
        })
      })
      .catch(function (error) {
        console.log(error.response.data);
        self.setState({
          error: error.response.data
        })
      });
  }
  
  getFriends() {
    var self = this;
    axios
      .get("http://localhost:8089/user-service/getFriends/" + this.props.cookies.ownerUsername)
      .then((response) => {
        console.log(response.data);
        this.setState({
          friends: response.data
        })
      })
      .catch(function (error) {
        console.log(error.response.data);
        self.setState({
          error: error.response.data
        })
      });
  }

  showFriendsList() {
    this.getFriends();
    this.setState({
      showFriendsList: true
    })
  }
  showIncoming() {
    console.log("incoming");
    this.getPending();
    this.setState({
      showIncoming: true
    })
  }
  sendResponse(user, response) {
    var self = this;
    axios
      .patch("http://localhost:8089/user-service/friendResponse", {
        friendUsername: `${this.props.cookies.ownerUsername}`,
        ownerUsername: `${user}`,
        response: `${response}`
      })
      .then((response) => {
        console.log(response.data);
        self.getPending();
      })
      .catch(function (error) {
        console.log(error.response.data);
        self.setState({
          error: error.response.data
        })
      });
  }

  removeUser(user){
    var self = this;
    axios
      .patch("http://localhost:8089/user-service/removeFriend", {
        ownerUsername: `${this.props.cookies.ownerUsername}`,
        friendUsername: `${user}`,
      })
      .then((response) => {
        console.log(response.data);
        self.getFriends();
      })
      .catch(function (error) {
        console.log(error.response.data);
        self.setState({
          error: error.response.data
        })
      });
  }
  render() {

    return (
      <div>
        <Button type="button" className="actionIcons" variant="dark" onClick={() => this.addFriend()}>👤+</Button>
        <Button type="button" className="actionIcons" variant="dark" onClick={() => this.showIncoming()}>{'\ud83d\udce8'}</Button>
        <Button type="button" className="actionIcons" variant="dark" onClick={() => this.showFriendsList()}>👥</Button>

        <Reviews cookies={this.props.cookies}></Reviews>

        {this.state.showAdd &&
          <Modal show={this.state.showAdd} backdrop="static" className="ModalContainer" centered animation={false}>
            <div className="ModalContent">

              <Modal.Body>
                <input type="text" name="username" className="searchBar" placeholder="Enter your friend's username!" onChange={this.onChange} />
                <button onClick={this.search} className="actionIcons">{'\uD83D\uDD0D\uFE0E'}</button>
                {this.state.error &&
                  <p>{this.state.error}</p>
                }
              </Modal.Body>
              <Modal.Footer>
                <button onClick={() => this.closeModal()}>Close</button>
              </Modal.Footer>
            </div>
          </Modal>
        }

        {this.state.showIncoming &&
          <FriendIncomingRequests
            pending={this.state.pending}
            show={this.state.showIncoming}
            error={this.state.error}
            sendResponse={this.sendResponse.bind()}
            closeModal={this.closeModal.bind()}
          >
          </FriendIncomingRequests>
        }
        {this.state.showFriendsList &&
          <FriendsList
            friends={this.state.friends}
            show={this.state.showFriendsList}
            error={this.state.error}
            closeModal={this.closeModal.bind()}
            removeUser={this.removeUser.bind()}
          >
          </FriendsList>
        }

      </div>
    );
  }
}

export default FeedPage;