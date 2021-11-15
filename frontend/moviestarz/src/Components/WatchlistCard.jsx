import React, { Component } from "react";

class WatchlistCard extends Component {

  state = {};

  render() {
    return (
      <div>
        '{this.props.title}'
        {this.props.isPublic === "true" ?
          '  \uD83D\uDD13'
          :
          // Closed Lock '\uD83D\uDD12'
          '  👥'
        }
        <br />
        By: {this.props.ownerUsername}
        <br />
        Movie Count: {this.props.movies.length}
        <br />
        Total User Count: {this.props.adminUsers.length + this.props.viewerUsers.length}

      </div>
    );
  }
}

export default WatchlistCard;