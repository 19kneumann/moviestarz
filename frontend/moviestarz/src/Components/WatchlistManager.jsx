import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import ModalHeader from "react-bootstrap/esm/ModalHeader";

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
    show: true,
    mergedArray: []
  };
  
  closeModal() {
    this.setState({ show: false });
    this.props.closeModal();
  }

  updateUser = (e) => {
    let user = e.target.name;
    let filteredAdmin = this.state.adminUsers.filter(users => users !== user)
    let filteredViewer = this.state.viewerUsers.filter(users => users !== user)
    console.log(e.target.value.toString())
    if(e.target.value.toString() === "true"){
      console.log("Admin")
      filteredAdmin.push(user)
    }else{
      console.log("Viewer")
      filteredViewer.push(user)
    }
    this.setState({
      adminUsers : filteredAdmin,
      viewerUsers: filteredViewer,
      mergedArray: filteredAdmin.concat(filteredViewer)
    })
  }

  onChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
    this.props.onChange(evt);
  };

  removeUser = (user) => {
    let filterAdmin = this.state.adminUsers.filter(users => users !== user)
    let filterUser = this.state.viewerUsers.filter(users => users !== user)
    this.setState({
      adminUsers: filterAdmin,
      viewerUsers:  filterUser,
      mergedArray: filterAdmin.concat(filterUser)
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
      viewerUsers: this.props.viewerUsers,
      mergedArray: this.props.mergedArray
    })
  }

  render() {
    let movies;
    let adminUsers;
    console.log(this.state)
    console.log(this.state.movies, this.state.movies.length)
    console.log("Admins: " + this.state.adminUsers, this.state.adminUsers.length)
    console.log("Viewers:" + this.state.viewerUsers, this.state.viewerUsers.length)

    if (this.state.movies !== [] && this.state.movies.length > 0) {
      movies = (<div>
        Movies:
        {this.props.movies.map(movie => <div>
          <pre>     {'\u2022'} {movie} <Button variant='dark' type="button" id="noMarginButton"onClick={() => this.props.removeMovie(movie)}> Remove</Button></pre>
          {/* <Button variant='dark' type="button" onClick={() => this.props.removeMovie(movie)}> Remove</Button> */}
        </div>)}
      </div>)
    } else {
      movies = <div> No movies added </div>
    }

    if (this.state.mergedArray.length > 0) {
      adminUsers = (
        <div>
          Users:
          {this.props.mergedArray.map(user => <div>
            <pre>     {'\u2022'} {user} <select id="isAdmin" name={user} value={this.state.adminUsers.includes(user)} onChange={this.updateUser} >
              <option value="true">Admin</option>
              <option value="false">Viewer</option>
            </select>  <Button variant='dark' id="noMarginButton" onClick={() => this.props.removeUser(user)}> Remove</Button>
            </pre>
          </div>)}
        </div>
      )
    } else {
      adminUsers = <div> No Users available </div>
    }

    // if (this.state.adminUsers !== [] && this.state.adminUsers.length > 0) {
    //   adminUsers = (
    //     <div>
    //       Admin Users:
    //       {this.props.adminUsers.map(user => <div>
    //         {user}
    //         <select id="isAdmin" name={user} onChange={this.updateUser} >
    //           <option value="true">Admin</option>
    //           <option value="false">Viewer</option>
    //         </select>
    //         <button onClick={() => this.props.removeUser(user)}> Remove</button>
    //       </div>)}
    //     </div>
    //   )
    // } else {
    //   adminUsers = <div> No Users available </div>
    // }

    // if (this.state.viewerUsers !== [] && this.state.viewerUsers.length > 0) {
    //   viewerUsers = (
    //     <div>
    //       Viewer Users:
    //       {this.props.viewerUsers.map(user =>
    //         <div>
    //           {user}
    //           <select id="isAdmin" name={user} onChange={this.updateUser} >
    //             <option value="false">Viewer</option>
    //             <option value="true">Admin</option>
    //           </select>
    //           <button type="button" onClick={() => this.props.removeUser(user)}> Remove</button></div>)}
    //     </div>
    //   )
    // } else {
    //   viewerUsers = <div> No Viewer users available </div>
    // }


    return (
      <div>
        <Modal show={this.state.show} backdrop="static" className="ModalContainer" centered animation={false}>
          <div className="ModalContent">
          <Button onClick={() => this.closeModal()} className="closeModalBtn" variant="dark">X</Button>
          <ModalHeader>
            <div>Edit the watchlist <span className="title">{this.state.title}</span></div>
            </ModalHeader>
            <Modal.Body>
              <form onSubmit={this.createWatchlist}>
              {this.state.isPublic.toString() === "true" ?
                  '  \uD83D\uDD13'
                  :
                  ' 👥'
                }
                <select id="isPublic" name="isPublic" value={this.state.isPublic} onChange={this.onChange} >
                  <option value="true">Public</option>
                  <option value="false">Friends Only</option>
                </select>
                <br/>
                <br />
                <label>Watchlist Title:  </label>
                <br />
                <input type="text" name="title" value={this.state.title} onChange={this.onChange} />
                <br />
                <br/>
              </form>
              {movies}
              {adminUsers}
            </Modal.Body>
            <Modal.Footer>
              <Button variant='dark' onClick={() => this.props.saveWatchlist(this.state.id, this.state.ownerUsername, this.props.movies, this.state.isPublic, this.state.title, this.state.adminUsers, this.state.viewerUsers)}>Submit </Button>
              {/* <button onClick={() => this.props.deleteReview(this.props.reviewId)}>Delete </button> */}
              {/* <button onClick={() => this.closeModal()}>Close</button> */}
            </Modal.Footer>
          </div>
        </Modal>

      </div>
    );
  }
}

export default WatchlistManager;