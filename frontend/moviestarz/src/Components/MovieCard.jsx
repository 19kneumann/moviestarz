import React, { Component } from "react";

class MovieCard extends Component {

    state = {};


  render() {
    return (
      <div>
        <img src={"https://image.tmdb.org/t/p/original" + this.props.poster} height='150' width='100'  alt=""/>
        Title: {this.props.title} | 
        Rating: {this.props.rating}
      </div>
    );
  }
}

export default MovieCard;