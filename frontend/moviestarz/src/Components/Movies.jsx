import React, { Component } from "react";
import MovieCard from "./MovieCard";
import axios from "axios";
import CreateReview from "./CreateReview";
import { Modal, ModalBody } from "react-bootstrap";
import '../App.css'
class Movies extends Component {

  constructor(){
    super();
    this.createReview = this.createReview.bind(this)
    this.search = this.search.bind(this);
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
            this.setState({ watchlists: response.data});
          })
          .catch(function (error) {
            console.log("errorFetching");
          });
      };

      addMovie = (id) => {
        this.setState({
          addToWatchlist: true,
          movieId: id
        })
        console.log(id)
      }
      toggleCreateReview = (id) => {
        this.setState({
          createReview: true,
          movieId: id
        })
      }
      addToWatchlist = () => {
        console.log(this.state.watchlistId, this.state.movieId)
        axios
        .patch("http://localhost:8089/watchlist-service/" + this.state.watchlistId + "/" + this.state.movieId, {
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

      createReview(form){
        form.preventDefault();
        console.log("ah")
        axios
          .post("http://localhost:8089/review-service", {
            ownerUsername: this.props.cookies.ownerUsername,
            isPublic: `${form.target.isPublic.value}`,
            movie: `${form.target.movie.value}`,
            rating: `${form.target.rating.value}`,
            description: `${form.target.description.value}`
          })
          .then((response) => {
            console.log(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });
          this.setState({movieId:null})
      }
       openModal = (id, index)=> {
         console.log(id);
         console.log(this.state.movies[index].id);
         console.log(index);
         this.setState({
           modalId: id,
           modalIndex: index
         })
       }
       closeModal = () => {
         this.setState({
           modalId: null,
           modalIndex: null
         })
       }
      search(){
        console.log(this.state.search)
        if(this.state.search === ""){
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

        } else{
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
        <input type="text" name="search" onChange={this.onChange}/>
        <button onClick={this.search}> Search </button>
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
                ></MovieCard>
                {this.state.modalId === movie.id &&
                  <Modal show={this.state.modalId == movie.id} backdrop="static" className="ModalContainer" centered animation={false}>
                    <div className ="ModalContent">
                      <Modal.Body>
                        <div className="ModalBody">
                          <img src={"https://image.tmdb.org/t/p/original" + movie.poster_path} height='150' width='100'  alt=""/>
                          <p className="title">{this.state.movies[this.state.modalIndex].title} </p> <br/> 
                          {this.state.movies[this.state.modalIndex].overview}
                        </div>
                      
                      </Modal.Body>
                      <Modal.Footer>
                          <button onClick={() => this.closeModal()}>
                            Close
                          </button>
                          <button variant="primary">Understood</button>
                      </Modal.Footer>
                    </div>
                  </Modal>
                }

            {movie.id === this.state.movieId ? 
              <div>
                {this.state.addToWatchlist ?
                  <div>
                    <select id="watchlistId" name="watchlistId" onChange={this.onChange}>
                    <option value={null}> Add to...</option>
                    {this.state.watchlists.map((watchlist) => (
                        <option value={watchlist.watchlistId}> {watchlist.watchlistTitle} </option>
                    ))}
                    </select>
                    <button type="button" onClick={()=> this.setState({movieId: null})}>Close </button>
                    <button type="button" onClick={()=> this.addToWatchlist()} disabled={this.state.watchlistId === "Add to..." || this.state.watchlistId === null}>Add </button>
                  </div>
                :
                    <CreateReview 
                      createReview={this.createReview.bind()}
                      movie={this.state.movieId}
                      ></CreateReview> 
                }
                
              </div>
              :
              null
        }
            {/* {this.state.addToWatchlist ? 
                <div>
                  <select id="watchlistSelect" name="watchlistSelect">
                  {this.state.watchlists.map((watchlist) => (
                    <option value={watchlist.id}> {watchlist.watchlistTitle} </option>
                  ))}
                  </select>
                <button type="button" onClick={()=> this.setState({addToWatchlist: null})}>Close </button>
                <button type="button" onClick={()=> this.addToWatchlist()}>Add </button>
                </div>
                :
                null
        } */}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  }
}

export default Movies;