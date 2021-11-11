import React, { Component } from "react";

class ReviewCard extends Component {

  state = {};



  render() {
    return (
        <div>
          Id: {this.props.reviewId}
          <br />
          OwnerUsername: {this.props.ownerUsername}
          <br />
          Is Public: {this.props.isPublic}
          <br />
          Movie: {this.props.movie}
          <br />
          Rating: {this.props.rating}
          <br />
          Description: {this.props.description}
          <br />
        </div>
    );
  }
}

export default ReviewCard;