import React, { Component } from "react";
import Reviews from "../Components/Reviews";
import CreateReview from "../Components/CreateReview";

class FeedPage extends Component {

  render() {

    return (
		<div>
      <p>Feed Page</p>
      <Reviews></Reviews>
      <CreateReview></CreateReview>
    </div>
    );
  }
}

export default FeedPage;