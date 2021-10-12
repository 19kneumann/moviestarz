import React, { Component } from "react";
import MovieCard from "./MovieCard";
import axios from "axios";

class Movies extends Component {

    state = {
        movies: [],
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
      };


  render() {
    return (
      <div>
          {this.state.movies.map((movie) => (
              <React.Fragment key={movie.id}>

            <MovieCard 
              title={movie.title}
              poster={movie.poster_path}
              rating={movie.vote_average}
            ></MovieCard>
            </React.Fragment>

          ))}
      </div>
    );
  }
}

export default Movies;