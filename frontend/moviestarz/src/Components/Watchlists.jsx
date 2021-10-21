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
      constructor(){
        super();
        this.sendEditRequest = this.sendEditRequest.bind(this)
        this.addUser = this.addUser.bind(this)
      }
    
      componentDidMount = () => {    
        axios
          .get("http://localhost:8089/watchlist-service"
          )
          .then((response) => {
            console.log(response.data);
            this.setState({ watchlists: response.data });
          })
          .catch(function (error) {
            console.log("errorFetching");
          });


        // var watchlist = [
        //     {"id": "7",
        //     "title": "idk",
        //     "movies": [{"title": "the dungeon"},{"title": "idk"}],
        //     "adminUsers": [{"username": "xytix"}],
        //     "viewerUsers": [{"username": "monkeyman3773"}],
        //     "ownerUsername": "19kayla",
        //     "isPublic": "false"
        // }
        // ]
        // this.setState({ watchlists: watchlist})
      };

      toggleAddUser(watchlist){
        console.log(watchlist.id)
        this.setState({
          addUser: true,
          id: watchlist.watchlistId,
          ownerUsername: watchlist.ownerUsername,
          movies: watchlist.movies,
          isPublic: watchlist.isPublic,
          title: watchlist.watchlistTitle,
          adminUsers: watchlist.adminUsers,
          viewerUsers: watchlist.viewerUsers
        })
      }
      editWatchlist(watchlist){
        console.log(watchlist)
        console.log(watchlist.id)
        this.setState({
          editWatchlist: true,
          id: watchlist.watchlistId,
          ownerUsername: watchlist.ownerUsername,
          movies: watchlist.movies,
          isPublic: watchlist.isPublic,
          title: watchlist.watchlistTitle,
          adminUsers: watchlist.adminUsers,
          viewerUsers: watchlist.viewerUsers
        })
      }

      createWatchlist(e){
        e.preventDefault();
        axios
          .post("http://localhost:8089/watchlist-service", {
            ownerUsername: "19kayla",
            isPublic: `${e.target.isPublic.value}`,
            title: `${e.target.title.value}`
          })
          .then((response) => {
            this.getReviews();
            console.log(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });
      }

      sendEditRequest(){
        let id = this.state.id;
        console.log(id)
        axios
          .patch("http://localhost:8089/watchlist-service/" + {id}, {
            ownerUsername: "19kayla",
            isPublic: `${this.state.isPublic}`,
            title: `${this.state.title}`,
            movies: `${this.state.movies}`,
            adminUsers: `${this.state.adminUsers}`,
            viewerUsers: `${this.state.viewerUsers}`
          })
          .then((response) => {
            console.log(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });
      }

      addUser(e){
        let adminArray = this.state.adminUsers
        if(e.target.isAdmin.value === "true"){
          console.log("admin")
         adminArray.push(e.target.user.value)
          
        }
        axios
          .patch("http://localhost:8089/watchlist-service/" + this.state.id, {
            ownerUsername: "19kayla",
            isPublic: `${this.state.isPublic}`,
            title: `${this.state.title}`,
            movies: `${this.state.movies}`,
            adminUsers: `${adminArray}`,
            viewerUsers: `${this.state.viewerUsers}`
          })
          .then((response) => {
            console.log(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });
          console.log(adminArray);
      }

      removeUser = (user) => {
        let filterAdmin = this.state.adminUsers.filter(users => users != user)
        this.setState({
            adminUsers: filterAdmin,
            viewerUsers: this.state.viewerUsers.filter(users => users != user)
          });
          //this.state.adminUsers = filterAdmin;
          console.log(filterAdmin)
        }

  render() {
    this.state.watchlists.map((watchlist) =>{
      if(watchlist.adminUsers[0] != undefined && watchlist.adminUsers.length == 1){
        watchlist.adminUsers = watchlist.adminUsers[0].split(",");
        console.log(watchlist.adminUsers)
      }
    }

    )
    return (

      <div>
          {this.state.watchlists.map((watchlist) => (
            <React.Fragment key={watchlist.watchlistId}>
            <WatchlistCard 
            id={watchlist.watchlistId}
            ownerUsername={watchlist.ownerUsername}
            movies={watchlist.movies}
            isPublic={watchlist.public.toString()}
            title={watchlist.watchlistTitle}
            adminUsers={watchlist.adminUsers}
            viewerUsers={watchlist.viewerUsers}
            sendEditRequest={this.sendEditRequest.bind()}
            ></WatchlistCard>
            <button type="button" onClick={() => this.editWatchlist(watchlist)}>Edit Watchlist</button>
            <button type="button" onClick={() => this.toggleAddUser(watchlist)}>Add User</button>
            </React.Fragment>
          ))}
          {this.state.addUser ?
          <div>
           <WatchlistAddUser addUser={this.addUser.bind()}
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
           <WatchlistManager 
          //  update={this.update.bind()}
               id={this.state.id}
               ownerUsername={this.state.ownerUsername}
               movies={this.state.movies}
               isPublic={this.state.IsPublic}
               title={this.state.title}
               adminUsers={this.state.adminUsers}
               viewerUsers={this.state.viewerUsers}
               removeUser={this.removeUser.bind()}
           />
           <button type="button" onClick={()=> this.setState({editWatchlist: null})}>Close </button>
           </div>
           :
           null
        }
        <WatchlistCreate
        createWatchlist={this.createWatchlist.bind()}
        />
      </div>
    );
  }
}

export default Watchlists;