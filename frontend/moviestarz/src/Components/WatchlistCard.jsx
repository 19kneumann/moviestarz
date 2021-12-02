import React, { Component } from "react";
import { Button } from "react-bootstrap";
class WatchlistCard extends Component {

  state = {};

  render() {
    return (
      <div className="watchlistAllItems">
        <div className="watchlistFirstBox">
          <p><span className="title">'{this.props.title}'</span>
            {this.props.isPublic === "true" ?
              '  \uD83D\uDD13'
              :
              // Closed Lock '\uD83D\uDD12'
              ' 👥'
            }
          </p>
          <br />
          <p>
            Owner: {this.props.ownerUsername}
          </p>
        </div>
        <div className="watchlistSecondBox">
          <p>
          Movie Count: {this.props.movies.length}
          </p>
          <p>
          Total User Count: {this.props.adminUsers.length + this.props.viewerUsers.length}
          </p>
        </div>
        <div className="watchlistThirdBox">
          {this.props.ownWatchlist ?
            <div>
              <Button type="button" className="actionIcons" variant="dark" onClick={(e) => this.props.editWatchlist(e, this.props.watchlist)}>✎</Button>
              <br />
              <Button type="button" className="actionIcons" variant="dark" onClick={(e) => this.props.toggleAddUser(e, this.props.watchlist)}>👤+</Button>
            </div>
            :
            null
          }
        </div>
      </div>
    );
  }
}

export default WatchlistCard;