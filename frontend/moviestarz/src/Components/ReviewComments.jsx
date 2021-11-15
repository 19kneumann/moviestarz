import React, { Component } from "react";

class ReviewComment extends Component {
  render() {
    return (
        <div className="Comment">
          {this.props.ownerUsername}
          <br />
          "{this.props.content}"
        </div>
    );
  }
}

export default ReviewComment;