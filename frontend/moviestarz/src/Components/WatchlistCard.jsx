import React, { Component } from "react";

class WatchlistCard extends Component {

    state = {};

  render() {
    return (
      <div>
        Id: {this.props.id}
        <br/>
        OwnerUsername: {this.props.ownerUsername}
        <br/>
        Is Public: {this.props.isPublic}
        <br/>
        Title: {this.props.title}
        <br/>
        movies:
        {this.props.movies.map(movie => <div>{movie.title}</div> )}
        <br/>
        Admin Users: {this.props.adminUsers.map(user => user.username)}
        <br/>
        Viewer Users: {this.props.viewerUsers.map(user => user.username)}
        <br/>
        {/* <button onClick="editReview(${review.id})">Edit</button> */}
        <br/><br/>
      </div>
    );
  }
}

export default WatchlistCard;