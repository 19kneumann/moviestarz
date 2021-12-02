import React, { Component } from "react";
import MovieCard from "./MovieCard";
import axios from "axios";
import CreateReview from "./CreateReview";
import { Modal, Button } from "react-bootstrap";

import '../App.css'
class Movies extends Component {

  constructor() {
    super();
    this.createReview = this.createReview.bind(this)
    this.search = this.search.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  state = {
    modalId: null,
    modalIndex: null,
    movies: [],
    addToWatchlist: false,
    watchlists: [],
    movieId: null,
    watchlistId: null,
    search: null
  };

  onChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  };

  componentDidMount = () => {
    axios
      .get("https://api.themoviedb.org/3/discover/movie?api_key=af69558f05513147c6444f75dd27b6a1&language=en-US&sort_by=popularity.desc"
      )
      .then((response) => {
        console.log(response.data);
        this.setState({ movies: response.data.results });
      })
      .catch(function (error) {
        console.log("errorFetching");
      });

    axios
      .get("http://localhost:8089/watchlist-service/" + this.props.cookies.ownerUsername
      )
      .then((response) => {
        console.log(response.data);
        this.setState({ watchlists: response.data });
      })
      .catch(function (error) {
        console.log("errorFetching");
      });
  };

  addMovie = (e, id, watchlistId) => {
    e.stopPropagation();
    this.setState({
      watchlistId: watchlistId,
      movieId: id,

    })
    this.addToWatchlist(id, watchlistId);
  }
  toggleCreateReview = (e, id) => {
    e.stopPropagation();
    this.setState({
      createReview: true,
      movieId: id
    })
  }
  addToWatchlist = (id, watchlistId) => {
    console.log(id, watchlistId)
    axios
      .patch("http://localhost:8089/watchlist-service/" + watchlistId + "/" + id, {
        // ownerUsername: "19kayla",
        // isPublic: `${this.state.isPublic}`,
        // title: `${this.state.title}`,
        // movies: `${this.state.movieId}`,
        // adminUsers: `${this.state.adminUsers}`,
        // viewerUsers: `${this.state.viewerUsers}`
      })
      .then((response) => {
        console.log(response.data);
        this.setState({
          addToWatchlist: false,
          movieId: null
        })
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  createReview(isPublic, movie, rating, description, image) {
    //form.preventDefault();
    console.log("ah")
    axios
      .post("http://localhost:8089/review-service", {
        ownerUsername: this.props.cookies.ownerUsername,
        isPublic: `${isPublic}`,
        movie: `${movie}`,
        rating: `${rating}`,
        description: `${description}`,
        image: `${image}`
      })
      .then((response) => {
        console.log(response.data);
        this.closeModal();
      })
      .catch(function (error) {
        console.log(error);
      });
    this.setState({ movieId: null })
  }
  openModal = (id, index) => {
    console.log(id);
    console.log(this.state.movies[index].id);
    console.log(index);
    this.setState({
      modalId: id,
      modalIndex: index,
      movieId: null
    })
  }
  closeModal = () => {
    this.setState({
      modalId: null,
      modalIndex: null,
      movieId: null
    })
  }
  search() {
    console.log(this.state.search)
    if (this.state.search === "") {
      axios
        .get("https://api.themoviedb.org/3/discover/movie?api_key=af69558f05513147c6444f75dd27b6a1&language=en-US&sort_by=popularity.desc"
        )
        .then((response) => {
          console.log(response.data);
          this.setState({ movies: response.data.results });
        })
        .catch(function (error) {
          console.log("errorFetching");
        });

    } else {
      axios
        .get("https://api.themoviedb.org/3/search/movie?api_key=af69558f05513147c6444f75dd27b6a1&language=en-US&query=" + this.state.search
        )
        .then((response) => {
          console.log(response.data);
          this.setState({ movies: response.data.results });
        })
        .catch(function (error) {
          console.log("errorFetching");
        });
    }
  }

  render() {
    return (
      <div>
        <input type="text" name="search" className="searchBar" placeholder="Search for a movie!!" onChange={this.onChange} />
        <button onClick={this.search} className="actionIcons">{'\uD83D\uDD0D\uFE0E'}</button>
        <div className="movieContainer">
          {this.state.movies.map((movie, index) => (
            <React.Fragment key={movie.id}>
              <MovieCard
                index={index}
                openModal={this.openModal.bind()}
                addMovie={this.addMovie.bind()}
                toggleCreateReview={this.toggleCreateReview.bind()}
                id={movie.id}
                title={movie.title}
                poster={movie.poster_path}
                rating={movie.vote_average}
                watchlists={this.state.watchlists.filter(watchlist => !watchlist.movies.includes(movie.title))}
              ></MovieCard>

              {this.state.modalId === movie.id &&
                <Modal show={this.state.modalId === movie.id} backdrop="static" className="ModalContainer" centered animation={false}>
                  <div className="ModalContent">
                  <Button onClick={() => this.closeModal()} className="closeModalBtn" variant="dark">X</Button>
                    <Modal.Body>
                      <div className="ModalBody">
                        <img src={"https://image.tmdb.org/t/p/original" + movie.poster_path} height='150' width='100' alt="" />
                        <p className="title">{this.state.movies[this.state.modalIndex].title} </p> <br />
                        {this.state.movies[this.state.modalIndex].overview}
                      </div>
                    </Modal.Body>
                    {/* <Modal.Footer>
                      <button onClick={() => this.closeModal()}>Close</button>
                    </Modal.Footer> */}
                  </div>
                </Modal>
              }

              {movie.id === this.state.movieId &&
                <CreateReview
                  createReview={this.createReview.bind()}
                  movie={movie}
                  closeModal={this.closeModal.bind()}
                  show={this.state.movieId === movie.id}
                ></CreateReview>
              } 

            </React.Fragment>
          ))}
        </div>
      </div>
    );
  }
}

export default Movies;