import React, { Component } from "react";
import Watchlists from "../Components/Watchlists"
import WatchlistCreate from "../Components/WatchlistCreate"
import WatchlistAddUser from "../Components/WatchlistAddUser";

class WatchlistPage extends Component {

  render() {
    return (
      <div>
          <Watchlists></Watchlists>
      </div>

    );
  }
}

export default WatchlistPage;