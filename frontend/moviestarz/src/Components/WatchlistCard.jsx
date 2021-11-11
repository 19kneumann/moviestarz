import React, { Component } from "react";

class WatchlistCard extends Component {

  state = {};

  render() {
    return (
      <div>
        '{this.props.title}'
        {this.props.isPublic == "true" ?
          '\uD83D\uDD13'
          :
          // Closed Lock '\uD83D\uDD12'
          '👥'
        }
        <br />
        By: {this.props.ownerUsername}
        <br />
        Movie Count: {this.props.movies.length}
        <br />
        Total User Count: {this.props.adminUsers.length + this.props.viewerUsers.length}
        {/* Id: {this.props.id}
        <br /> */}
        {/* movies:
        {this.props.movies.map(movie => <React.Fragment key={movie}>{movie} <br /></React.Fragment>)}
        <br />
        Admin Users: {this.props.adminUsers.map(user => <React.Fragment key={user}>{user} <br /></React.Fragment>)}
        <br />
        Viewer Users: {this.props.viewerUsers.map(user => <React.Fragment key={user}>{user} <br /></React.Fragment>)}
        <br /> */}
        {/* <button onClick="editReview(${review.id})">Edit</button> */}
        {/* <br /><br /> */}
      </div>
    );
  }
}

export default WatchlistCard;