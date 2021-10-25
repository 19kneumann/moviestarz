import React, { Component } from "react";

class MovieCard extends Component {

    state = {};


  render() {
    return (
      <div>
        <img src={"https://image.tmdb.org/t/p/original" + this.props.poster} height='150' width='100'  alt=""/>
        Title: {this.props.title} | 
        Rating: {this.props.rating} |
        <button onClick= {() =>{this.props.addMovie(this.props.id)}}> Add to Watchlist </button>
        <button onClick= {() =>{this.props.toggleCreateReview(this.props.id)}}> Create Review </button>
      </div>
    );
  }
}

export default MovieCard;