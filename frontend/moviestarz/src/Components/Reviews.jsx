import React, { Component } from "react";
import ReviewCard from "./ReviewCard";
import axios from "axios";
import EditReview from "./EditReview";
import { Button, Modal } from "react-bootstrap";
import ReviewComment from "./ReviewComments";
class Reviews extends Component {
  state = {
    reviews: [],
    edit: null,
    editId: null,
    editOwnerUsername: null,
    editIsPublic: null,
    editMovie: null,
    editRating: null,
    editDescription: null,
    showEdit: null,
    openReview: false,
    image: null,
    comment: "",
    comments: [],
    friends: [],
    home: true
  };

  constructor() {
    super();
    this.addComment = this.addComment.bind(this)
  }
  editReview(e, review) {
    e.stopPropagation()
    console.log(review.public);
    this.setState({
      edit: true,
      editId: review.reviewId,
      editOwnerUsername: review.ownerUsername,
      editIsPublic: review.public,
      editMovie: review.movie,
      editRating: review.rating,
      editDescription: review.description,
      showEdit: true
    });
  }

  getReviews = () => {
    axios
      .get("http://localhost:8089/review-service/" + this.props.cookies.ownerUsername
      )
      .then((response) => {
        console.log(response.data);
        this.setState({ reviews: response.data });
      })
      .catch(function (error) {
        console.log("errorFetching");
      });
    this.setState({
      edit: null
    })
  };

  setComments = () => {
    this.state.reviews.map((review) => {
      if (review.reviewId === this.state.editId) {
        this.setState({
          comments: review.comments
        })
      }
    })
  }

  getReviewForComments = () => {
    axios
      .get("http://localhost:8089/review-service/review/" + this.state.editId
      )
      .then((response) => {
        console.log(response.data);
        this.setState({ comments: response.data.comments });
      })
      .catch(function (error) {
        console.log("errorFetching");
      });
  }

  seperateLists = () => {
    console.log(this.state)
    let friends = [];
    let publics = [];
    this.state.reviews.map((review) => {
      if (this.state.friends.includes(review.ownerUsername) || review.ownerUsername === this.props.cookies.ownerUsername) {
        // if(watchlist.adminUsers.includes(this.props.cookies.ownerUsername) || watchlist.viewerUsers.includes(this.props.cookies.ownerUsername) || watchlist.ownerUsername === this.props.cookies.ownerUsername ){
        console.log("friend");
        friends.push(review)
      } else {
        publics.push(review)
      }
    });
    this.setState({
      friendsReview: friends,
      publicReviews: publics,
      reviews: friends
    })
  }

  friendsAndReviews = () => {
    let getReviews = axios.get("http://localhost:8089/review-service/" + this.props.cookies.ownerUsername)
    let getFriends = axios.get("http://localhost:8089/user-service/getFriends/" + this.props.cookies.ownerUsername)
    let self = this;
    axios.all([getReviews, getFriends]).then(axios.spread((...responses) => {
      self.setState({
        reviews: responses[0].data,
        friends: responses[1].data
      })
      self.seperateLists();
    })).catch(errors => {
    })
  }

  updateReview = (reviewId, isPublic, movie, rating, description) => {
    axios
      .patch("http://localhost:8089/review-service/" + reviewId, {
        ownerUsername: `${this.props.cookies.ownerUsername}`,
        isPublic: `${isPublic}`,
        movie: `${movie}`,
        rating: `${rating}`,
        description: `${description}`,
      })
      .then((response) => {
        this.getReviews();
        console.log(response.data);
      })
      .catch(function (error) {
        console.log("errorFetching");
      });
  }

  openModal = (review) => {
    this.setState({
      edit: true,
      editId: review.reviewId,
      editOwnerUsername: review.ownerUsername,
      editIsPublic: review.public,
      editMovie: review.movie,
      editRating: review.rating,
      editDescription: review.description,
      image: review.image,
      comments: review.comments,
      openReview: true
    });
  }

  closeModal = () => {
    this.setState({
      showEdit: false,
      edit: false,
      openReview: false
    })
  }
  componentDidMount = () => {
    // this.getReviews();
    this.friendsAndReviews();
  }

  onChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  };

  deleteReview = (id) => {
    axios
      .delete("http://localhost:8089/review-service/" + id, {
      })
      .then((response) => {
        this.getReviews();
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  addComment() {
    var self = this;
    axios
      .patch("http://localhost:8089/review-service/addComment", {
        reviewId: `${this.state.editId}`,
        ownerUsername: `${this.props.cookies.ownerUsername}`,
        comment: `${this.state.comment}`
      })
      .then((response) => {
        console.log(response.data);
        self.getReviewForComments();
      })
      .catch(function (error) {
        console.log("errorFetching");
      });
    self.setState({
      comment: ""
    })
  }

  changeFeed = (home) => {
    if (home !== true) {
      this.setState({ reviews: this.state.publicReviews, home: false })
    } else {
      this.setState({ reviews: this.state.friendsReview, home: true })
    }
  }

  render() {
    return (
      <React.Fragment>
        {/* <div className="overAllFriendButtons"> */}
        <div className="marginTop">
          </div>
        {this.state.home ?
          <ul class="nav nav-tabs">
            <li class="nav-item">
              <a class="nav-link active" id="active" onClick={() => this.changeFeed(true)}>Feed</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" id="inactive" onClick={() => this.changeFeed(false)}>Public Review</a>
            </li>
          </ul>
          :
          <ul class="nav nav-tabs">
            <li class="nav-item">
              <a class="nav-link" id="inactive" onClick={() => this.changeFeed(true)}>Feed</a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" id="active" onClick={() => this.changeFeed(false)}>Public Review</a>
            </li>
          </ul>
        }
        {/* <select onChange={() => this.changeFeed()}>
          <option value={true}>Feed</option>
          <option value={false}>Public Reviews</option>
        </select> */}
        {/* <Button type="button" className="" variant="dark" onClick={() => this.props.addFriend}>Add Friend 👤+</Button>
          <Button type="button" className="" variant="dark" onClick={() => this.props.showIncoming}>Incoming Requests{'\ud83d\udce8'}</Button>
          <Button type="button" className="" variant="dark" onClick={() => this.props.showFriendsList}>Friends List👥</Button>
        </div> */}
        <br />
        <div className="reviewContainer">
          {this.state.reviews.map((review) => (
            <React.Fragment key={review.reviewId}>
              <div className="reviewCard" onClick={() => this.openModal(review)}>
                <ReviewCard
                  reviewId={review.reviewId}
                  ownerUsername={review.ownerUsername}
                  isPublic={review.public.toString()}
                  movie={review.movie}
                  rating={review.rating}
                  description={review.description}
                  image={review.image}
                  editReview={this.editReview.bind(this)}
                  cookies={this.props.cookies}
                  review={review}
                >
                </ReviewCard>
                <br /><br />
              </div>
            </React.Fragment>
          ))}
          {this.state.edit &&
            <div>
              <EditReview updateReview={this.updateReview.bind()}
                reviewId={this.state.editId}
                ownerUsername={this.state.editOwnerUsername}
                isPublic={this.state.editIsPublic.toString()}
                movie={this.state.editMovie}
                rating={this.state.editRating}
                description={this.state.editDescription}
                show={this.state.showEdit}
                closeModal={this.closeModal}
                deleteReview={this.deleteReview.bind()}
              />
            </div>
          }
          {this.state.openReview &&
            <Modal show={this.state.openReview} backdrop="static" className="ModalContainer" centered animation={false}>
              <div className="ModalContent">
                <Button onClick={() => this.closeModal()} className="closeModalBtn" variant="dark">X</Button>
                <p id="marginLeft">
                  <span className="title">{this.state.editOwnerUsername}</span>
                  {/* {this.state.editOwnerUsername} */}
                  's review of
                  <span className="title"> {this.state.editMovie} </span>
                </p>
                <Modal.Body>
                  <div>
                    {/* <p>{this.state.editOwnerUsername}
                      {this.state.editIsPublic.toString() === "true" ?
                        '  \uD83D\uDD13'
                        :
                        // Closed Lock '\uD83D\uDD12'
                        ' 👥'
                      }
                    </p>
                    Movie: {this.state.editMovie}
                    <br /> */}
                    <img src={this.state.image} height='150' width='100' alt="" />
                    <img height="45px" width="200px" src={this.state.editRating + ".png"} />
                    <br />
                    <br />
                    "{this.state.editDescription}"
                    <br />
                  </div>
                  {/* <button onClick="editReview(${review.id})">Edit</button> */}
                  {/* <br /><br /> */}
                </Modal.Body>
                <h1>Comments</h1>
                <input type="text" name="comment" className="commentBar" placeholder="Add a Comment!" onChange={this.onChange} value={this.state.comment} />
                <button onClick={() => this.addComment()} className="actionIcons">💬</button>
                {this.state.comments.length != 0 ?
                  <React.Fragment>
                    {this.state.comments.map(comment => <ReviewComment ownerUsername={comment.ownerUsername} content={comment.comment}> </ReviewComment>)}
                  </React.Fragment>
                  :
                  <p>Hmmm, there doesnt seem to be any comments!Be the first to make one</p>
                }
              </div>
            </Modal>
          }
        </div>
      </React.Fragment>
    );
  }
}

export default Reviews;