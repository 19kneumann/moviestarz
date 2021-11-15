import React, { Component } from "react";

class ReviewCard extends Component {

  state = {};



  render() {
    return (
        <div>
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
          <img src={this.props.image} height='150' width='100' alt="" />
        </div>
    );
  }
}

export default ReviewCard;