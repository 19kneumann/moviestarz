import React, { Component } from "react";
import Watchlists from "../Components/Watchlists"

class WatchlistPage extends Component {

  render() {
    return (
      <React.Fragment>
          <Watchlists cookies={this.props.cookies}></Watchlists>
      </React.Fragment>

    );
  }
}

export default WatchlistPage;