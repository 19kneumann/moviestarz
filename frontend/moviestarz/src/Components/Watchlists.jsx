import React, { Component } from "react";
import WatchlistCard from "./WatchlistCard";
import axios from "axios";

class Watchlists extends Component {

    state = {
        watchlists: [],
      };
    
      componentDidMount = () => {    
        // axios
        //   .get("https://api.themoviedb.org/3/discover/movie?api_key=af69558f05513147c6444f75dd27b6a1&language=en-US&sort_by=popularity.desc"
        //   )
        //   .then((response) => {
        //     console.log(response.data);
        //     this.setState({ movies: response.data.results });
        //   })
        //   .catch(function (error) {
        //     console.log("errorFetching");
        //   });

        var watchlist = [
            {"id": "7",
            "title": "idk",
            "movies": [{"title": "the dungeon"},{"title": "idk"}],
            "adminUsers": [{"username": "xytix"}],
            "viewerUsers": [],
            "ownerUsername": "19kayla",
            "isPublic": "false"
        }
        ]
        this.setState({ watchlists: watchlist})
      };

      editWatchlist(){
          
      }

  render() {
    return (
      <div>
          {this.state.watchlists.map((watchlist) => (
            <React.Fragment key={watchlist.id}>

            <WatchlistCard 
            id={watchlist.id}
            ownerUsername={watchlist.ownerUsername}
            movies={watchlist.movies}
            isPublic={watchlist.isPublic}
            title={watchlist.title}
            adminUsers={watchlist.adminUsers}
            viewerUsers={watchlist.viewerUsers}
            ></WatchlistCard>
            <button onClick={() => this.editReview(watchlist)}>Edit</button>

            </React.Fragment>
          ))}
      </div>
    );
  }
}

export default Watchlists;