import React, { Component } from "react";
class WatchlistCreate extends Component {

    state = {
      isPublic: null,
      title: null,
      rating: null,
      description: null
    };
  
    onChange = (evt) => {
      this.setState({
        [evt.target.name]: evt.target.value,
      });
    };
  
  
    render() {
      return (
        <div>
          <h1> CREATE WATCHLIST </h1>
          <form onSubmit={this.props.createWatchlist}>
                <label>Visibility</label>
                <br/>
                <select id="isPublic" name="isPublic" onChange={this.onChange} >
                      <option value="true">Public</option>
                      <option value="false">Friends Only</option>
                </select>
                <br/>
                <label>Watchlist Title</label>
                <br/>
                <input type="text" name="title" onChange={this.onChange}/>
                <br/>
          </form>
          <button>Create Watchlist</button>
        </div>
      );
    }
  }
  
  export default WatchlistCreate;