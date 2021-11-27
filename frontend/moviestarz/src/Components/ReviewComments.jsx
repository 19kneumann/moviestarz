import React, { Component } from "react";

class ReviewComment extends Component {
  render() {
    return (
        <div className="Comment">
          <b className="plainPinkTitle">{this.props.ownerUsername}</b>
          <br />
          "{this.props.content}"
        </div>
    );
  }
}

export default ReviewComment;