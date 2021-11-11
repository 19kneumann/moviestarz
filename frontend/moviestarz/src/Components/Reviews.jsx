import React, { Component } from "react";
import ReviewCard from "./ReviewCard";
import axios from "axios";
import EditReview from "./EditReview";
import { Button } from "react-bootstrap";
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
    showEdit: null
  };

  editReview(review) {
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

    // var reviewList = [
    //     {"id": "1",
    //     "ownerUsername": "19kayla",
    //     "isPublic": "true",
    //     "title": "idk",
    //     "rating": "4",
    //     "description": "this is a description"
    // }, 
    // {"id": "10",
    // "ownerUsername": "19kayla",
    //     "isPublic": "false",
    //     "title": "hehe",
    //     "rating": "2",
    //     "description": "blahh"
    // }
    //]
    //this.setState({ reviews: reviewList})
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

  closeModal = () => {
    this.setState({
      showEdit: false,
      edit: false
    })
  }
  componentDidMount = () => {
    this.getReviews();
    // var array = this.state.reviews;
    // array.forEach(element => {
    //   if(element.id == e.target.id.value){
    //     console.log(e.target.isPublic.value);
    //     element.isPublic = e.target.isPublic.value;
    //     element.movie = e.target.movie.value;
    //     element.rating = e.target.rating.value;
    //     element.description = e.target.description.value;
    //   }
    // });


  }

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
  // createReview(form){
  //   form.preventDefault();
  //   axios
  //     .post("http://localhost:8089/review-service", {
  //       ownerUsername: "19kayla",
  //       isPublic: `${form.target.isPublic.value}`,
  //       movie: `${form.target.movie.value}`,
  //       rating: `${form.target.rating.value}`,
  //       description: `${form.target.description.value}`
  //     })
  //     .then((response) => {
  //       this.getReviews();
  //       console.log(response.data);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }

  render() {
    return (
      <div className="reviewContainer">
        <div/>
        {this.state.reviews.map((review) => (
          <React.Fragment key={review.reviewId}>
            <a className="reviewCard" onClick={()=> console.log("ahh")}>
            <ReviewCard
              reviewId={review.reviewId}
              ownerUsername={review.ownerUsername}
              isPublic={review.public.toString()}
              movie={review.movie}
              rating={review.rating}
              description={review.description}
            >
            </ReviewCard>
            {review.ownerUsername === this.props.cookies.ownerUsername ?
              <Button className="actionIcons" variant="dark" onClick={() => this.editReview(review)}>✎</Button>
              :
              null
            }
            <br /><br />
            </a>
          </React.Fragment>
        ))}
        {this.state.edit ?
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
          :
          null
        }
        {/* <CreateReview 
        createReview={this.createReview.bind()}
        ></CreateReview> */}

      </div>
    );
  }
}

export default Reviews;