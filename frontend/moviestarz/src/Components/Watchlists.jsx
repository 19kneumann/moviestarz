import React, { Component } from "react";
import WatchlistCard from "./WatchlistCard";
import axios from "axios";
import WatchlistAddUser from "./WatchlistAddUser";
import WatchlistManager from "./WatchlistManager"
import WatchlistCreate from "./WatchlistCreate";
import { Button, ModalBody } from "react-bootstrap";
import { Modal } from "react-bootstrap";
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
    openWatchlist: false
  };
  constructor() {
    super();
    this.sendEditRequest = this.sendEditRequest.bind(this)
    this.addUser = this.addUser.bind(this)
    this.createWatchlist = this.createWatchlist.bind(this)
    this.saveWatchlist = this.saveWatchlist.bind(this);
    this.closeModal = this.closeModal.bind(this);
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
        var filteredFriends = filteredFriends.filter(user => !this.state.viewerUsers.includes(user));
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

  noSpaces = () => {
    this.state.watchlists.forEach(watchlist => {
      console.log(watchlist.watchlistTitle)
      console.log(watchlist.adminUsers.filter(user => user === this.props.cookies.ownerUsername) === [this.props.cookies.ownerUsername])
      console.log(watchlist.adminUsers.filter(user => user === this.props.cookies.ownerUsername).length !== 0)
      console.log(watchlist.adminUsers.filter(user => user === this.props.cookies.ownerUsername))
      console.log([this.props.cookies.ownerUsername])
      if (watchlist.adminUsers[0] !== undefined && watchlist.adminUsers.length === 1) {
        let adminUsers = watchlist.adminUsers[0].split(",");
        // console.log(adminUsers)
        watchlist.adminUsers = adminUsers.filter(users => users !== '')
        // console.log(watchlist.adminUsers)
      }
      if (watchlist.viewerUsers[0] !== undefined && watchlist.viewerUsers.length === 1) {
        let viewerUsers = watchlist.viewerUsers[0].split(",");
        watchlist.viewerUsers = viewerUsers.filter(users => users !== '')
        // console.log(watchlist.viewerUsers)
      }
      if (watchlist.movies[0] !== undefined && watchlist.movies.length === 1) {
        let moviesUpdated = watchlist.movies[0].split(",");
        watchlist.movies = moviesUpdated.filter(users => users !== '')
        // console.log(watchlist.movies)
      }
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
        this.noSpaces();
      })
      .catch(function (error) {
        console.log("errorFetching");
      });
  }
  componentWillMount = () => {
    this.callWatchlists();
    this.setState({
      ownerUsername: this.props.cookies.ownerUsername
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

  toggleAddUser(watchlist) {
    console.log(watchlist.id)
    this.setState({
      addUser: true,
      id: watchlist.watchlistId,
      ownerUsername: watchlist.ownerUsername,
      movies: watchlist.movies,
      isPublic: watchlist.isPublic,
      title: watchlist.watchlistTitle,
      adminUsers: watchlist.adminUsers,
      viewerUsers: watchlist.viewerUsers
    })
    this.getFriends();
  }

  editWatchlist(watchlist) {
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
      show: true
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
      show: false
    })
    this.sendEditRequest();
  }

  createWatchlist(e) {
    //e.preventDefault();
    axios
      .post("http://localhost:8089/watchlist-service", {
        ownerUsername: this.state.ownerUsername,
        isPublic: `${e.target.isPublic.value}`,
        title: `${e.target.title.value}`
      })
      .then((response) => {
        console.log(response.data);
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
      openWatchlist: false
    });
  }

  sendEditRequest() {
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
    this.setState({
      adminUsers: filterAdmin,
      viewerUsers: this.state.viewerUsers.filter(users => users !== user)
    });
    //this.state.adminUsers = filterAdmin;
    console.log(filterAdmin)
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

  render() {
    this.noSpaces()
    return (

      <div className="watchlistContainer">
        <WatchlistCreate
          createWatchlist={this.createWatchlist.bind()}
        />
        {this.state.watchlists.map((watchlist) => (
          <React.Fragment key={watchlist.watchlistId}>
            <a className="watchlistCard" onClick={() => this.openWatchlistInfo(watchlist)}>
              <WatchlistCard
                id={watchlist.watchlistId}
                ownerUsername={watchlist.ownerUsername}
                movies={watchlist.movies}
                isPublic={watchlist.public.toString()}
                title={watchlist.watchlistTitle}
                adminUsers={watchlist.adminUsers}
                viewerUsers={watchlist.viewerUsers}
                sendEditRequest={this.sendEditRequest.bind()}
              ></WatchlistCard>
              {(watchlist.ownerUsername === this.props.cookies.ownerUsername || watchlist.adminUsers.filter(user => user === this.props.cookies.ownerUsername).length !== 0) ?
                <div>
                  <Button type="button" className="actionIcons" variant="dark" onClick={() => this.editWatchlist(watchlist)}>✎</Button>
                  <Button type="button" className="actionIcons" variant="dark" onClick={() => this.toggleAddUser(watchlist)}>👤+</Button>
                </div>
                :
                null
              }

            </a>
          </React.Fragment>
        ))}
        {this.state.openWatchlist &&
          <Modal show={this.state.openWatchlist} backdrop="static" className="ModalContainer" centered animation={false}>
            <div className="ModalContent">
            <h1>Watchlist Information!</h1>
            <button onClick={() => this.closeModal()}>Close</button>
            <ModalBody>
              Id: {this.state.id}
              <br />
              OwnerUsername: {this.state.ownerUsername}
              <br />
              Is Public: {this.state.isPublic}
              <br />
              Title: {this.state.title}
              <br />
              movies:
              {this.state.movies.map(movie => <React.Fragment key={movie}>{movie} <br /></React.Fragment>)}
              <br />
              Admin Users: {this.state.adminUsers.map(user => <React.Fragment key={user}>{user} <br /></React.Fragment>)}
              <br />
              Viewer Users: {this.state.viewerUsers.map(user => <React.Fragment key={user}>{user} <br /></React.Fragment>)}
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

            />
          </div>
          :
          null
        }

      </div>
    );
  }
}

export default Watchlists;