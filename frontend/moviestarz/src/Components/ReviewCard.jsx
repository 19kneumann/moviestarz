import React, { Component } from "react";
import { Button } from "react-bootstrap";

class ReviewCard extends Component {

  state = {};



  render() {
    return (
      <div className="reviewCardAllItems">
        <div className="reviewFirstBox">
          <img src={this.props.image} height='175' width='125' alt="" />
          <p>By: {this.props.ownerUsername}
            {this.props.isPublic === "true" ?
              '  \uD83D\uDD13'
              :
              // Closed Lock '\uD83D\uDD12'
              ' 👥'
            }
          </p>
        </div>
        <div className="reviewSecondBox">
          <p className="title">{this.props.movie}</p>
          {/* Rating: {this.props.rating} */}
          <img height="45px" width="200px"src={this.props.rating +".png"}/>
          <br/>
          <br/>

          <p>"{this.props.description}"</p>
        </div>
        <div className="reviewThirdBox">
        {this.props.ownerUsername === this.props.cookies.ownerUsername &&
          <Button className="actionIcons" variant="dark" onClick={(e) => this.props.editReview(e, this.props.review)}>✎</Button>
        }
        </div>
      </div>
    );
  }
}

export default ReviewCard;