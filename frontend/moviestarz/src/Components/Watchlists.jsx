import React, { Component } from "react";
import WatchlistCard from "./WatchlistCard";
import axios from "axios";
import WatchlistAddUser from "./WatchlistAddUser";
import WatchlistManager from "./WatchlistManager"
import WatchlistCreate from "./WatchlistCreate";
import { Button, ModalBody } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
class Watchlists extends Component {

  state = {
    watchlists: [],
    addUser: false,
    editWatchlist: false,
    id: null,
    ownerUsername: null,
    movies: null,
    isPublic: null,
    title: null,
    adminUsers: null,
    viewerUsers: null,
    show: false,
    friends: [],
    openWatchlist: false,
    home: true,
    allWatchlists: [],
    ownedWatchlists: [],
    publicWatchlists: [],
    refresh: true
  };
  constructor() {
    super();
    this.sendEditRequest = this.sendEditRequest.bind(this)
    this.addUser = this.addUser.bind(this)
    this.createWatchlist = this.createWatchlist.bind(this)
    this.saveWatchlist = this.saveWatchlist.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.getFriends = this.getFriends.bind(this);
    this.callWatchlists = this.callWatchlists.bind(this);
    this.editWatchlist = this.editWatchlist.bind(this);
    this.toggleAddUser = this.toggleAddUser.bind(this);
  }

  onChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  };

  getFriends() {
    var self = this;
    axios
      .get("http://localhost:8089/user-service/getFriends/" + this.props.cookies.ownerUsername)
      .then((response) => {
        console.log(response.data);
        var filteredFriends = response.data.filter(user => !this.state.adminUsers.includes(user));
        filteredFriends = filteredFriends.filter(user => !this.state.viewerUsers.includes(user));
        this.setState({
          friends: filteredFriends
        })
      })
      .catch(function (error) {
        console.log(error.response.data);
        self.setState({
          error: error.response.data
        })
      });
  }



  callWatchlists = () => {
    console.log(this.props)
    axios
      .get("http://localhost:8089/watchlist-service/" + this.props.cookies.ownerUsername
        //.get("http://localhost:8089/watchlist-service/"
      )
      .then((response) => {
        console.log(response.data);
        this.setState({ watchlists: response.data });
      })
      .catch(function (error) {
        console.log("errorFetching");
      });
  }

  seperateLists = () => {
    console.log(this.state)
    let owned = [];
    let publics = [];
    this.state.allWatchlists.map((watchlist) => {
      console.log(watchlist.adminUsers)
      // if (this.state.friends.includes(watchlist.ownerUsername)) {
      if (watchlist.adminUsers.includes(this.props.cookies.ownerUsername) || watchlist.viewerUsers.includes(this.props.cookies.ownerUsername) || watchlist.ownerUsername === this.props.cookies.ownerUsername) {
        console.log("friend");
        owned.push(watchlist)
      } else {
        publics.push(watchlist)
      }
    });
    this.setState({
      ownedWatchlists: owned,
      publicWatchlists: publics,
      watchlists: owned
    })
  }

  friendsAndWatchlists = () => {
    let getWatchlists = axios.get("http://localhost:8089/watchlist-service/" + this.props.cookies.ownerUsername)
    let getFriends = axios.get("http://localhost:8089/user-service/getFriends/" + this.props.cookies.ownerUsername)
    let self = this;
    axios.all([getWatchlists, getFriends]).then(axios.spread((...responses) => {
      self.setState({
        allWatchlists: responses[0].data,
        friends: responses[1].data
      })
      self.seperateLists();
    })).catch(errors => {
    })
  }
  componentWillMount = () => {
    // this.getFriends();
    // this.callWatchlists();
    this.friendsAndWatchlists()
    // this.seperateLists();
    this.setState({
      ownerUsername: this.props.cookies.ownerUsername,
    })

    // var watchlist = [
    //     {"id": "7",
    //     "title": "idk",
    //     "movies": [{"title": "the dungeon"},{"title": "idk"}],
    //     "adminUsers": [{"username": "xytix"}],
    //     "viewerUsers": [{"username": "monkeyman3773"}],
    //     "ownerUsername": "19kayla",
    //     "isPublic": "false"
    // }
    // ]
    // this.setState({ watchlists: watchlist})
  };

  toggleAddUser(e, watchlist) {
    e.stopPropagation();
    console.log(watchlist)
    this.setState({
      addUser: true,
      id: watchlist.watchlistId,
      ownerUsername: watchlist.ownerUsername,
      movies: watchlist.movies,
      isPublic: watchlist.public,
      title: watchlist.watchlistTitle,
      adminUsers: watchlist.adminUsers,
      viewerUsers: watchlist.viewerUsers
    })
    this.getFriends();
  }

  editWatchlist(e, watchlist) {
    e.stopPropagation();
    console.log(watchlist)
    console.log(watchlist.watchlistId)
    this.setState({
      editWatchlist: true,
      id: watchlist.watchlistId,
      ownerUsername: watchlist.ownerUsername,
      movies: watchlist.movies,
      isPublic: watchlist.public,
      title: watchlist.watchlistTitle,
      adminUsers: watchlist.adminUsers,
      viewerUsers: watchlist.viewerUsers,
      show: true,
      mergedArray: watchlist.adminUsers.concat(watchlist.viewerUsers)
    })
  }
  saveWatchlist(id, ownerUsername, movies, isPublic, title, adminUsers, viewerUsers) {
    this.setState({
      editWatchlist: false,
      id: id,
      ownerUsername: ownerUsername,
      movies: movies,
      isPublic: isPublic,
      title: title,
      adminUsers: adminUsers,
      viewerUsers: viewerUsers,
      show: false,
      editWatchlist: false,
      addUser: false
    })
    axios
      .patch("http://localhost:8089/watchlist-service/" + id, {
        ownerUsername: `${ownerUsername}`,
        isPublic: `${isPublic}`,
        title: `${title}`,
        movies: `${movies}`,
        adminUsers: `${adminUsers}`,
        viewerUsers: `${viewerUsers}`
      })
      .then((response) => {
        this.friendsAndWatchlists();
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  createWatchlist = (isPublic, title) => {
    var self = this;
    axios
      .post("http://localhost:8089/watchlist-service", {
        ownerUsername: self.state.ownerUsername,
        isPublic: `${isPublic}`,
        title: `${title}`
      })
      .then((response) => {
        console.log(response.data);
        self.closeModal()
        self.friendsAndWatchlists()
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  closeModal() {
    this.setState({
      show: false,
      editWatchlist: false,
      addUser: false,
      openWatchlist: false,
      createWatchlist: false
    });
  }

  sendEditRequest() {
    console.log(this.state)
    axios
      .patch("http://localhost:8089/watchlist-service/" + this.state.id, {
        ownerUsername: `${this.state.ownerUsername}`,
        isPublic: `${this.state.isPublic}`,
        title: `${this.state.title}`,
        movies: `${this.state.movies}`,
        adminUsers: `${this.state.adminUsers}`,
        viewerUsers: `${this.state.viewerUsers}`
      })
      .then((response) => {
        console.log(response.data);
        this.friendsAndWatchlists()
      })
      .catch(function (error) {
        console.log(error);
      });

    this.setState({
      editWatchlist: false,
      addUser: false
    })
    this.callWatchlists();
  }


  removeUser = (user) => {
    let filterAdmin = this.state.adminUsers.filter(users => users !== user)
    let filterUser = this.state.viewerUsers.filter(users => users !== user)
    this.setState({
      adminUsers: filterAdmin,
      viewerUsers: filterUser,
      mergedArray: filterAdmin.concat(filterUser)
    });
    //this.state.adminUsers = filterAdmin;
    console.log(this.state.mergedArray)
    console.log(this.state.adminUsers)
    console.log(this.state.viewerUsers)

    console.log("hsdfj")

  }

  removeMovie = (movie) => {
    let movies = this.state.movies.filter(movies => movies !== movie)
    this.setState({
      movies: movies,
    });
    //this.state.adminUsers = filterAdmin;
  }
  addUser(id, isAdmin, username) {
    let adminArray = this.state.adminUsers
    let viewerArray = this.state.viewerUsers
    if (isAdmin.toString() === "true") {
      adminArray.push(username)
    } else {
      viewerArray.push(username)
    }
    this.setState({
      id: id,
      adminUsers: adminArray,
      viewerUsers: viewerArray
    })
    this.sendEditRequest();
  }

  openWatchlistInfo(watchlist) {
    this.setState({
      openWatchlist: true,
      id: watchlist.watchlistId,
      ownerUsername: watchlist.ownerUsername,
      isPublic: watchlist.public.toString(),
      title: watchlist.watchlistTitle,
      adminUsers: watchlist.adminUsers,
      viewerUsers: watchlist.viewerUsers,
      movies: watchlist.movies
    })
  }

  changeFeed = () => {
    if (this.state.home === true) {
      this.setState({ watchlists: this.state.publicWatchlists, home: false })
    } else {
      this.setState({ watchlists: this.state.ownedWatchlists, home: true })
    }
  }
  render() {
    return (
      <React.Fragment>
        <Button onClick={() => this.setState({ createWatchlist: true })} variant="dark" className="actionIcons"> +</Button>
        <select onChange={() => this.changeFeed()}>
          <option value={true}>Your Watchlists</option>
          <option value={false}>Explore Public</option>
        </select>
        <div className="watchlistContainer">
          {this.state.createWatchlist &&
            <WatchlistCreate
              createWatchlist={this.createWatchlist}
              show={this.state.createWatchlist}
              closeModal={this.closeModal}
            />
          }
          {this.state.watchlists.map((watchlist) => (
            <React.Fragment key={watchlist.watchlistId}>
              <div className="watchlistCard" onClick={() => this.openWatchlistInfo(watchlist)}>
                <WatchlistCard
                  id={watchlist.watchlistId}
                  ownerUsername={watchlist.ownerUsername}
                  movies={watchlist.movies}
                  isPublic={watchlist.public.toString()}
                  title={watchlist.watchlistTitle}
                  adminUsers={watchlist.adminUsers}
                  viewerUsers={watchlist.viewerUsers}
                  sendEditRequest={this.sendEditRequest.bind()}
                  ownWatchlist={(watchlist.ownerUsername === this.props.cookies.ownerUsername || watchlist.adminUsers.filter(user => user === this.props.cookies.ownerUsername).length !== 0)}
                  editWatchlist={this.editWatchlist.bind()}
                  toggleAddUser={this.toggleAddUser.bind()}
                  watchlist={watchlist}
                ></WatchlistCard>
                {/* {(watchlist.ownerUsername === this.props.cookies.ownerUsername || watchlist.adminUsers.filter(user => user === this.props.cookies.ownerUsername).length !== 0) ?
                    <div>
                      <Button type="button" className="actionIcons" variant="dark" onClick={(e) => this.editWatchlist(e, watchlist)}>✎</Button>
                      <Button type="button" className="actionIcons" variant="dark" onClick={(e) => this.toggleAddUser(e, watchlist)}>👤+</Button>
                    </div>
                    :
                    null
                  } */}

              </div>
            </React.Fragment>
          ))}
          {this.state.openWatchlist &&
            <Modal show={this.state.openWatchlist} backdrop="static" className="ModalContainer" centered animation={false}>
              <div className="ModalContent">
                
                <Button onClick={() => this.closeModal()} className="closeModalBtn" variant="dark">X</Button>
                <ModalHeader>
                <h1 className="title">'{this.state.title}'
                  {this.state.isPublic === "true" ?
                    '  \uD83D\uDD13'
                    :
                    ' 👥'
                  }
                </h1>
                  Created By: {this.state.ownerUsername}

                  </ModalHeader>
                <ModalBody>
                  <br />
                  {this.state.movies.length === 0 ?
                    <p>No movies added yet</p>
                    :
                    <React.Fragment>
                      Movies:
                      <br />
                      {this.state.movies.map(movie => <React.Fragment key={movie}> <pre>     {'\u2022'} {movie} </pre> <br /></React.Fragment>)}
                    </React.Fragment>
                  }
                  {this.state.adminUsers.length === 0 ?
                    <p>No Admins</p>
                    :
                    <React.Fragment>
                      Admins:
                      <br />
                      {'\t'}{this.state.adminUsers.map(user => <React.Fragment key={user}><pre>     {'\u2022'} {user} </pre> <br /> </React.Fragment>)}
                    </React.Fragment>
                  }
                  {/* Admin Users: {this.state.adminUsers.map(user => <React.Fragment key={user}>{user} </React.Fragment>)} */}
                  {/* <br /> */}
                  {this.state.viewerUsers.length === 0 ?
                    <p>No Viewers</p>
                    :
                    <React.Fragment>
                      Viewers:
                      <br />
                      {'\t'}{this.state.viewerUsers.map(user => <React.Fragment key={user}><pre>     {'\u2022'} {user} </pre> <br /> </React.Fragment>)}
                    </React.Fragment>
                  }
                  <br />
                  {/* <button onClick="editReview(${review.id})">Edit</button> */}
                  {/* <br /><br /> */}
                </ModalBody>
              </div>
            </Modal>
          }
          {this.state.addUser ?
            <div>
              <WatchlistAddUser
                addUser={this.addUser.bind()}
                id={this.state.id}
                ownerUsername={this.state.ownerUsername}
                movies={this.state.movies}
                isPublic={this.state.isPublic}
                title={this.state.title}
                adminUsers={this.state.adminUsers}
                viewerUsers={this.state.viewerUsers}
                closeModal={this.closeModal.bind()}
                friends={this.state.friends}
              />
            </div>
            :
            null
          }
          {this.state.editWatchlist ?
            <div>
              <WatchlistManager
                editWatchlist={this.sendEditRequest.bind()}
                id={this.state.id}
                ownerUsername={this.state.ownerUsername}
                movies={this.state.movies}
                isPublic={this.state.isPublic}
                title={this.state.title}
                adminUsers={this.state.adminUsers}
                viewerUsers={this.state.viewerUsers}
                onChange={this.onChange.bind()}
                removeUser={this.removeUser.bind()}
                removeMovie={this.removeMovie.bind()}
                show={this.state.show}
                saveWatchlist={this.saveWatchlist.bind()}
                closeModal={this.closeModal.bind()}
                mergedArray={this.state.mergedArray}
              />
            </div>
            :
            null
          }

        </div>
      </React.Fragment>
    );
  }
}

export default Watchlists;