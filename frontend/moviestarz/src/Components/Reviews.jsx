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
    comments: []
  };

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
        console.log(response.data[0].public)
        this.setState({ reviews: response.data });
      })
      .catch(function (error) {
        console.log("errorFetching");
      });
    this.setState({
      edit: null
    })
  };

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
    this.getReviews();
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
  addComment(){
    axios
      .patch("http://localhost:8089/review-service/addComment", {
        reviewId: `${this.state.editId}`,
        ownerUsername: `${this.props.cookies.ownerUsername}`,
        comment: `${this.state.comment}`
      })
      .then((response) => {
        this.getReviews();
        console.log(response.data);
      })
      .catch(function (error) {
        console.log("errorFetching");
      });
  }
  render() {
    return (
      <div className="reviewContainer">
        <div />
        {this.state.reviews.map((review) => (
          <React.Fragment key={review.reviewId}>
            <div className="reviewCard" onClick={() => this.openModal(review)}>
              {review.ownerUsername === this.props.cookies.ownerUsername &&
                <Button className="actionIcons" variant="dark" onClick={(e) => this.editReview(e, review)}>✎</Button>
              }
              <ReviewCard
                reviewId={review.reviewId}
                ownerUsername={review.ownerUsername}
                isPublic={review.public.toString()}
                movie={review.movie}
                rating={review.rating}
                description={review.description}
                image={review.image}
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
              isPublic={this.state.editIsPublic}
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
              <h1>Detailed Review</h1>
              <button onClick={() => this.closeModal()}>Close</button>
              <Modal.Body>
                <div>
                  OwnerUsername: {this.state.editOwnerUsername}
                  <br />
                  Is Public: {this.state.editIsPublic}
                  <br />
                  Movie: {this.state.editMovie}
                  <br />
                  Rating: {this.state.editRating}
                  <br />
                  Description: {this.state.editDescription}
                  <br />
                  <img src={this.state.image} height='150' width='100' alt="" />
                </div>
                {/* <button onClick="editReview(${review.id})">Edit</button> */}
                {/* <br /><br /> */}
              </Modal.Body>
              <h1>Comments</h1>
              <input type="text" name="comment" className="commentBar" placeholder="Add a Comment!" onChange={this.onChange} />
              <button onClick={()=> this.addComment()} className="actionIcons">💬</button>
              {this.state.comments.map(comment => <ReviewComment ownerUsername={comment.ownerUsername} content={comment.comment}> </ReviewComment>)}
              <Modal.Footer>
              </Modal.Footer>
            </div>
          </Modal>

        }
      </div>
    );
  }
}

export default Reviews;