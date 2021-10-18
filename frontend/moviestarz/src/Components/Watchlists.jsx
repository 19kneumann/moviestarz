import React, { Component } from "react";
import WatchlistCard from "./WatchlistCard";
import axios from "axios";
import WatchlistAddUser from "./WatchlistAddUser";
import WatchlistManager from "./WatchlistManager"
import WatchlistCreate from "./WatchlistCreate";

class Watchlists extends Component {

    state = {
        watchlists: [],
        addUser: false,
        editWatchlist: false,
        id: null,
        ownerUsername: null,
        movies: null,
        isPublic: null,
        title: null,
        adminUsers: null,
        viewerUsers:null
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
            "viewerUsers": [{"username": "monkeyman3773"}],
            "ownerUsername": "19kayla",
            "isPublic": "false"
        }
        ]
        this.setState({ watchlists: watchlist})
      };

      addUser(watchlist){
        console.log(watchlist.id)
        this.setState({
          addUser: true,
          id: watchlist.id,
          ownerUsername: watchlist.ownerUsername,
          movies: watchlist.movies,
          isPublic: watchlist.isPublic,
          title: watchlist.title,
          adminUsers: watchlist.adminUsers,
          viewerUsers: watchlist.viewerUsers
        })
      }
      editWatchlist(watchlist){
        console.log(watchlist.id)
        this.setState({
          editWatchlist: true,
          id: watchlist.id,
          ownerUsername: watchlist.ownerUsername,
          movies: watchlist.movies,
          isPublic: watchlist.isPublic,
          title: watchlist.title,
          adminUsers: watchlist.adminUsers,
          viewerUsers: watchlist.viewerUsers
        })
      }

      update(e){

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
            <button type="button" onClick={() => this.editWatchlist(watchlist)}>Edit Watchlist</button>
            <button type="button" onClick={() => this.addUser(watchlist)}>Add User</button>
            </React.Fragment>
          ))}
          {this.state.addUser ?
          <div>
           <WatchlistAddUser update={this.update.bind()}
               id={this.state.id}
               ownerUsername={this.state.ownerUsername}
               movies={this.state.movies}
               isPublic={this.state.IsPublic}
               title={this.state.title}
               adminUsers={this.state.adminUsers}
               viewerUsers={this.state.viewerUsers}
           />
           <button type="button" onClick={()=> this.setState({addUser: null})}>Close </button>
           </div>
           :
           null
        }
        {this.state.editWatchlist ?
          <div>
           <WatchlistManager update={this.update.bind()}
               id={this.state.id}
               ownerUsername={this.state.ownerUsername}
               movies={this.state.movies}
               isPublic={this.state.IsPublic}
               title={this.state.title}
               adminUsers={this.state.adminUsers}
               viewerUsers={this.state.viewerUsers}
           />
           <button type="button" onClick={()=> this.setState({addUser: null})}>Close </button>
           </div>
           :
           null
        }
        <WatchlistCreate/>
      </div>
    );
  }
}

export default Watchlists;