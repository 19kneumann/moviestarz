import React, { Component } from "react";
import { DropdownButton, Dropdown, Button } from "react-bootstrap";
class MovieCard extends Component {

  state = {};


  render() {
    var string = this.props.rating;
    string = string * 10
    return (
      <div className="movieCard" onClick={() => this.props.openModal(this.props.id, this.props.index)}>
        <img id="moviePicture"src={"https://image.tmdb.org/t/p/original" + this.props.poster} height='150' width='100' alt="" />
        <div className="movieContent">
          <p className="title" id="movieTitle">{this.props.title}</p> <br/>
          <p id="movieRating">Rating: {string}% </p>
        </div>
        {/* <button onClick= {(e) =>{this.props.addMovie(e, this.props.id)}}> Add to Watchlist </button> */}
        <div id="addToWatchlistOverall">
          {this.props.watchlists.length === 0 ?
            <DropdownButton title="+" id="watchlistId" name="watchlistId" onClick={(e) => e.stopPropagation()} size="sm" variant="dark" >
              <Dropdown.Header>No Watchlists to add to!</Dropdown.Header>
            </DropdownButton>
            :
            <div>
              <DropdownButton title="+" id="watchlistAdd" name="watchlistId" onClick={(e) => e.stopPropagation()} size="sm" variant="dark" >
                <Dropdown.Header>Add to Watchlist...</Dropdown.Header>
                {this.props.watchlists.map((watchlist) => (
                  // <Dropdown.Item as="button" onClick={() =>this.setState({watchlistId: watchlist.watchlistId}) }>{watchlist.watchlistTitle}</Dropdown.Item>
                  <Dropdown.Item key={watchlist.watchlistId}as="button" onClick={(e) => { this.props.addMovie(e, this.props.title, watchlist.watchlistId) }}>{watchlist.watchlistTitle}</Dropdown.Item>
                ))}
              </DropdownButton>
            </div>
          }
          <Button size="sm" className="createReviewBtn" onClick={(e) => { this.props.toggleCreateReview(e, this.props.id) }} variant="dark">★</Button>
        </div>
        {/* <button onClick= {(e) =>{this.props.toggleCreateReview(e, this.props.id)}}> Create Review </button> */}
      </div>
    );
  }
}

export default MovieCard;