import React, { Component } from "react";
import { Modal } from "react-bootstrap";

class WatchlistManager extends Component {

  state = {
    id: null,
    ownerUsername: null,
    movies: null,
    isPublic: null,
    title: null,
    adminUsers: null,
    viewerUsers: null,
    update: false,
    show: true
  };
  
  closeModal() {
    this.setState({ show: false });
    this.props.closeModal();
  }

  onChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
    this.props.onChange(evt);
  };

  removeUser = (user) => {
    let filterAdmin = this.state.adminUsers.filter(users => users !== user)
    this.setState({
      adminUsers: filterAdmin,
      viewerUsers: this.state.viewerUsers.filter(users => users !== user)
    });
    //this.state.adminUsers = filterAdmin;
    console.log(filterAdmin)
  }

  componentWillMount = () => {
    this.setState({
      id: this.props.id,
      ownerUsername: this.props.ownerUsername,
      movies: this.props.movies,
      isPublic: this.props.isPublic,
      title: this.props.title,
      adminUsers: this.props.adminUsers,
      viewerUsers: this.props.viewerUsers
    })
  }

  render() {
    let movies;
    let adminUsers;
    let viewerUsers;

    console.log(this.state.movies, this.state.movies.length)
    console.log(this.state.adminUsers, this.state.adminUsers.length)
    console.log(this.state.viewerUsers, this.state.viewerUsers.length)

    if (this.state.movies !== [] && this.state.movies.length > 0) {
      movies = (<div>
        Movie:
        {this.props.movies.map(movie => <div>
          {movie}
          <button type="button" onClick={() => this.props.removeMovie(movie)}> Remove</button>
        </div>)}
      </div>)
    } else {
      movies = <div> No movies added </div>
    }

    if (this.state.adminUsers !== [] && this.state.adminUsers.length > 0) {
      adminUsers = (
        <div>
          Admin Users:
          {this.props.adminUsers.map(user => <div>
            {user}
            <select id="isAdmin" name="isAdmin" onChange={this.updateUser} >
              <option value="true">Admin</option>
              <option value="false">Viewer</option>
            </select>
            <button onClick={() => this.props.removeUser(user)}> Remove</button>
          </div>)}
        </div>
      )
    } else {
      adminUsers = <div> No Admin users available </div>
    }

    if (this.state.viewerUsers !== [] && this.state.viewerUsers.length > 0) {
      viewerUsers = (
        <div>
          Viewer Users:
          {this.props.viewerUsers.map(user =>
            <div>
              {user}
              <select id="isAdmin" name="isAdmin" onChange={this.updateUser} >
                <option value="false">Viewer</option>
                <option value="true">Admin</option>
              </select>
              <button type="button" onClick={() => this.props.removeUser(user)}> Remove</button></div>)}
        </div>
      )
    } else {
      viewerUsers = <div> No Viewer users available </div>
    }


    return (
      <div>
        <Modal show={this.state.show} backdrop="static" className="ModalContainer" centered animation={false}>
          <div className="ModalContent">
            <h1> EDIT REVIEW </h1>
            <Modal.Body>
              <h1> EDIT FORM </h1>
              <form onSubmit={this.createWatchlist}>
                <label>Id:</label> <b />
                <input type="text" name="id" value={this.state.id} readOnly />
                <br />
                <input type="text" name="ownerUsername" value={this.state.ownerUsername} readOnly />
                <br />
                <select id="isPublic" name="isPublic" value={this.state.isPublic} onChange={this.onChange} >
                  <option value="true">Public</option>
                  <option value="false">Friends Only</option>
                </select>
                <br />
                <label>Watchlist Title</label>
                <br />
                <input type="text" name="title" value={this.state.title} onChange={this.onChange} />
                <br />
              </form>
              {movies}
              {adminUsers}
              {viewerUsers}
            </Modal.Body>
            <Modal.Footer>
              <button onClick={() => this.props.saveWatchlist(this.state.id, this.state.ownerUsername, this.state.isPublic, this.state.title, this.state.adminUsers, this.state.viewerUsers)}>Submit </button>
              {/* <button onClick={() => this.props.deleteReview(this.props.reviewId)}>Delete </button> */}
              <button onClick={() => this.closeModal()}>Close</button>
            </Modal.Footer>
          </div>
        </Modal>

      </div>
    );
  }
}

export default WatchlistManager;