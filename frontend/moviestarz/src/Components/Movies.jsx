import React, { Component } from "react";
import MovieCard from "./MovieCard";
import axios from "axios";
import CreateReview from "./CreateReview";
import { Modal, Button } from "react-bootstrap";
import InfiniteScroll from 'react-infinite-scroll-component';

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
    search: null,
    page: 1
  };

  onChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  };

  componentDidMount = () => {
    this.getMovies();
    this.friendsAndWatchlists()
  };

  getMovies = () => {
    axios
      .get("https://api.themoviedb.org/3/discover/movie?api_key=af69558f05513147c6444f75dd27b6a1&language=en-US&sort_by=popularity.desc&page=" + this.state.page
      )
      .then((response) => {
        console.log(response.data);
        this.setState({ movies: this.state.movies.concat(response.data.results) });
      })
      .catch(function (error) {
        console.log("errorFetching");
      });
    this.setState({ page: this.state.page + 1 })
  }

  seperateLists = () => {
    console.log(this.state)
    let owned = [];
    let publics = [];
    this.state.allWatchlists.map((watchlist) => {
      console.log(watchlist.adminUsers)
      // if (this.state.friends.includes(watchlist.ownerUsername)) {
      if (watchlist.adminUsers.includes(this.props.cookies.ownerUsername) || watchlist.viewerUsers.includes(this.props.cookies.ownerUsername) || watchlist.ownerUsername === this.props.cookies.ownerUsername) {
        console.log("friend");
        owned.push(watchlist)
      } else {
        publics.push(watchlist)
      }
    });
    this.setState({
      ownedWatchlists: owned,
      publicWatchlists: publics,
      watchlists: owned
    })
  }

  friendsAndWatchlists = () => {
    let getWatchlists = axios.get("http://localhost:8089/watchlist-service/" + this.props.cookies.ownerUsername)
    let getFriends = axios.get("http://localhost:8089/user-service/getFriends/" + this.props.cookies.ownerUsername)
    let self = this;
    axios.all([getWatchlists, getFriends]).then(axios.spread((...responses) => {
      self.setState({
        allWatchlists: responses[0].data,
        friends: responses[1].data
      })
      self.seperateLists();
    })).catch(errors => {
    })
  }

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
        this.friendsAndWatchlists()
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
          <InfiniteScroll
            dataLength={this.state.movies.length} //This is important field to render the next data
            next={this.getMovies}
            hasMore={true}
            loader={<h4>Loading...</h4>}
            endMessage={
              <p style={{ textAlign: 'center' }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
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
        </InfiniteScroll>
      </div>
    );
  }
}

export default Movies;