import React, { Component } from "react";
import Reviews from "../Components/Reviews";
import CreateReview from "../Components/CreateReview";
import EditReview from "../Components/EditReview"
class FeedPage extends Component {

  render() {

    return (
		<div>
      <p>Feed Page</p>
      <Reviews></Reviews>
    </div>
    );
  }
}

export default FeedPage;