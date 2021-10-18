import React, { Component } from "react";
import WatchlistAddUser from "./WatchlistAddUser";

class WatchlistManager extends Component {

    state = {
        id: null,
        ownerUsername: null,
        movies: null,
        isPublic: null,
        title: null,
        adminUsers: null,
        viewerUsers:null,
        update: false
    };

    onChange = (evt) => {
      this.setState({
        [evt.target.name]: evt.target.value,
      });
    };
  
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
        if(this.props.movies == null){
            this.setState({movies: []})
        }
    }
    removeMovie = (event) => {
        this.setState({
            movies: this.state.movies.filter(e => !event.title)
          });
          console.log(this.state.movies)
        }
    
    render() {
      return (
        <div>
          <h1> EDIT FORM </h1>
          <form onSubmit={this.props.createWatchlist}>
            <input type="text" name="id" value={this.state.id} readOnly/>
            <br/>
            <input type="text" name="ownerUsername" value={this.state.ownerUsername} readOnly/>
            <br/>
            <label>Watchlist Title</label>
            <br/>
            <input type="text" name="title" value={this.state.title} onChange={this.onChange}/>
            <br/>
            Movie:
            {this.props.movies.map(movie => <div> 
                {movie.title} 
                <button type="button" onClick={() => this.removeMovie(movie)}> Remove</button>
                </div>)}
            Admin Users:
            {this.props.adminUsers.map(user => <div> 
                {user.username} 
                <select id="isAdmin" name="isAdmin" onChange={this.updateUser} >
                      <option value="true">Admin</option>
                      <option value="false">Viewer</option>
                </select>
                <button onClick={this.removeUser}> Remove</button>
                </div>)}
            Viewer Users:
            {this.props.viewerUsers.map(user => <div> 
                {user.username} 
                <select id="isAdmin" name="isAdmin" onChange={this.updateUser} >
                      <option value="false">Viewer</option>
                      <option value="true">Admin</option>
                </select>
                <button onClick={this.removeUser}> Remove</button></div>)}
                
          </form>
        
        </div>
      );
    }
  }
  
  export default WatchlistManager;