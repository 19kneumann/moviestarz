import React, { Component } from "react";
import Reviews from "../Components/Reviews";

class FeedPage extends Component {

  render() {

    return (
		<div>
      <p>Feed Page</p>
      <Reviews cookies={this.props.cookies}></Reviews>
    </div>
    );
  }
}

export default FeedPage;