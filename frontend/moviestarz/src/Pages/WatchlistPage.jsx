import React, { Component } from "react";
import Watchlists from "../Components/Watchlists"

class WatchlistPage extends Component {

  render() {
    return (
      <div>
          <Watchlists cookies={this.props.cookies}></Watchlists>
      </div>

    );
  }
}

export default WatchlistPage;