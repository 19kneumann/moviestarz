import React, { Component } from "react";
import MovieCard from "./MovieCard";
import axios from "axios";
import CreateReview from "./CreateReview";

class Movies extends Component {

  constructor(){
    super();
    this.createReview = this.createReview.bind(this)
  }
    state = {
        movies: [],
        addToWatchlist: false,
        watchlists: [],
        movieId: null,
        watchlistId: null
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
          .get("http://localhost:8089/watchlist-service"
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
            ownerUsername: "19kayla",
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


  render() {
    return (
      <div>
          {this.state.movies.map((movie) => (
              <React.Fragment key={movie.id}>
            <MovieCard 
              addMovie={this.addMovie.bind()}
              toggleCreateReview={this.toggleCreateReview.bind()}
              id={movie.id}
              title={movie.title}
              poster={movie.poster_path}
              rating={movie.vote_average}
            ></MovieCard>
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
    );
  }
}

export default Movies;