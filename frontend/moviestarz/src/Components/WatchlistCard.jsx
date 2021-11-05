import React, { Component } from "react";

class WatchlistCard extends Component {

  state = {};

  render() {
    return (
      <div>
        Id: {this.props.id}
        <br />
        OwnerUsername: {this.props.ownerUsername}
        <br />
        Is Public: {this.props.isPublic}
        <br />
        Title: {this.props.title}
        <br />
        movies:
        {this.props.movies.map(movie => <React.Fragment key={movie}>{movie} <br /></React.Fragment>)}
        <br />
        Admin Users: {this.props.adminUsers.map(user => <React.Fragment key={user}>{user} <br /></React.Fragment>)}
        <br />
        Viewer Users: {this.props.viewerUsers.map(user => <React.Fragment key={user}>{user} <br /></React.Fragment>)}
        <br />
        {/* <button onClick="editReview(${review.id})">Edit</button> */}
        <br /><br />
      </div>
    );
  }
}

export default WatchlistCard;