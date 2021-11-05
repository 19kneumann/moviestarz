import React, { Component } from "react";
import WatchlistCard from "./WatchlistCard";
import axios from "axios";
import WatchlistAddUser from "./WatchlistAddUser";
import WatchlistManager from "./WatchlistManager"
import WatchlistCreate from "./WatchlistCreate";

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
    viewerUsers: null
  };
  constructor() {
    super();
    this.sendEditRequest = this.sendEditRequest.bind(this)
    this.addUser = this.addUser.bind(this)
    this.createWatchlist = this.createWatchlist.bind(this)
  }

  onChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  };

  noSpaces = () => {
    this.state.watchlists.forEach(watchlist => {
      if (watchlist.adminUsers[0] !== undefined && watchlist.adminUsers.length === 1) {
        let adminUsers = watchlist.adminUsers[0].split(",");
        console.log(adminUsers)
        watchlist.adminUsers = adminUsers.filter(users => users !== '')
        console.log(watchlist.adminUsers)
      }
      if (watchlist.viewerUsers[0] !== undefined && watchlist.viewerUsers.length === 1) {
        let viewerUsers = watchlist.viewerUsers[0].split(",");
        watchlist.viewerUsers = viewerUsers.filter(users => users !== '')
        console.log(watchlist.viewerUsers)
      }
      if (watchlist.movies[0] !== undefined && watchlist.movies.length === 1) {
        let moviesUpdated = watchlist.movies[0].split(",");
        watchlist.movies = moviesUpdated.filter(users => users !== '')
        console.log(watchlist.movies)
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
  }
  editWatchlist(watchlist) {
    console.log(watchlist)
    console.log(watchlist.id)
    this.setState({
      editWatchlist: true,
      id: watchlist.watchlistId,
      ownerUsername: watchlist.ownerUsername,
      movies: watchlist.movies,
      isPublic: watchlist.isPublic,
      title: watchlist.watchlistTitle,
      adminUsers: watchlist.adminUsers,
      viewerUsers: watchlist.viewerUsers
    })
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

  sendEditRequest() {
    axios
      .patch("http://localhost:8089/watchlist-service/" + this.state.id, {
        ownerUsername: "19kayla",
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
  addUser(e) {
    let adminArray = this.state.adminUsers
    let viewerArray = this.state.viewerUsers
    if (e.target.isAdmin.value === "true") {
      adminArray.push(e.target.user.value)
    } else {
      viewerArray.push(e.target.user.value)
    }
    this.setState({
      adminUsers: adminArray,
      viewerUsers: viewerArray
    })
    this.sendEditRequest();

    // axios
    //   .patch("http://localhost:8089/watchlist-service/" + this.state.id, {
    //     ownerUsername: "19kayla",
    //     isPublic: `${this.state.isPublic}`,
    //     title: `${this.state.title}`,
    //     movies: `${this.state.movies}`,
    //     adminUsers: `${adminArray}`,
    //     viewerUsers: `${this.state.viewerUsers}`
    //   })
    //   .then((response) => {
    //     console.log(response.data);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
    //   console.log(adminArray);
  }

  render() {
    this.noSpaces()
    return (

      <div>
        {this.state.watchlists.map((watchlist) => (
          <React.Fragment key={watchlist.watchlistId}>
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
            <button type="button" onClick={() => this.editWatchlist(watchlist)}>Edit Watchlist</button>
            <button type="button" onClick={() => this.toggleAddUser(watchlist)}>Add User</button>
          </React.Fragment>
        ))}
        {this.state.addUser ?
          <div>
            <WatchlistAddUser addUser={this.addUser.bind()}
              id={this.state.id}
              ownerUsername={this.state.ownerUsername}
              movies={this.state.movies}
              isPublic={this.state.IsPublic}
              title={this.state.title}
              adminUsers={this.state.adminUsers}
              viewerUsers={this.state.viewerUsers}
            />
            <button type="button" onClick={() => this.setState({ addUser: null })}>Close </button>
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
              isPublic={this.state.IsPublic}
              title={this.state.title}
              adminUsers={this.state.adminUsers}
              viewerUsers={this.state.viewerUsers}
              onChange={this.onChange.bind()}
              removeUser={this.removeUser.bind()}
              removeMovie={this.removeMovie.bind()}

            />
            <button type="button" onClick={() => this.setState({ editWatchlist: null })}>Close </button>
          </div>
          :
          null
        }
        <WatchlistCreate
          createWatchlist={this.createWatchlist.bind()}
        />
      </div>
    );
  }
}

export default Watchlists;