import React, { Component } from "react";
import ReviewCard from "./ReviewCard";
import axios from "axios";
import CreateReview from "./CreateReview";
import EditReview from "./EditReview";

class Reviews extends Component {


    constructor(){
      super();
      this.createReview = this.createReview.bind(this)
    }

    state = {
        reviews: [],
        edit: null,
        editId: null,
        editOwnerUsername: null,
        editIsPublic: null,
        editMovie: null,
        editRating: null,
        editDescription: null
      };

      editReview(review){
        console.log(review.public);
        this.setState({edit: true,
          editId: review.reviewId,
          editOwnerUsername: review.ownerUsername,
          editIsPublic: review.public,
          editMovie: review.movie,
          editRating: review.rating,
          editDescription: review.description
        });
      }

      getReviews = () => {
        axios
          .get("http://localhost:8089/review-service"
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

      updateReview = (e) => {
        e.preventDefault();
        axios
          .patch("http://localhost:8089/review-service/" + e.target.reviewId.value, {
            ownerUsername: `${e.target.ownerUsername.value}`,
            isPublic: `${e.target.isPublic.value}`,
            movie: `${e.target.movie.value}`,
            rating: `${e.target.rating.value}`,
            description: `${e.target.description.value}`,
          })
          .then((response) => {
            this.getReviews();
            console.log(response.data);
          })
          .catch(function (error) {
            console.log("errorFetching");
          });
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
      createReview(form){
        form.preventDefault();
        axios
          .post("http://localhost:8089/review-service", {
            ownerUsername: "19kayla",
            isPublic: `${form.target.isPublic.value}`,
            movie: `${form.target.movie.value}`,
            rating: `${form.target.rating.value}`,
            description: `${form.target.description.value}`
          })
          .then((response) => {
            this.getReviews();
            console.log(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
      
  render() {
    return (
      <div>
          {this.state.reviews.map((review) => (
            <React.Fragment key={review.reviewId}>
            <ReviewCard 
            reviewId={review.reviewId}
            ownerUsername={review.ownerUsername}
            isPublic={review.public.toString()}
            movie={review.movie}
            rating={review.rating}
            description={review.description}
            >
            </ReviewCard>
            <button onClick={() => this.editReview(review)}>Edit</button>
            <br/><br/>
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
           />
           <button type="button" onClick={()=> this.setState({edit: null})}>Close </button>
           <button type="button" onClick={()=> this.deleteReview(this.state.editId)}>Delete </button>
           </div>
           :
           null
        }
        <CreateReview 
        createReview={this.createReview.bind()}
        ></CreateReview>

      </div>
    );
  }
}

export default Reviews;