import React, { Component } from "react";
import ReviewCard from "./ReviewCard";
import axios from "axios";
import CreateReview from "./CreateReview";
import EditReview from "./EditReview";

class Reviews extends Component {

    state = {
        reviews: [],
        edit: null,
        editIsPublic: null,
        editMovie: null,
        editRating: null,
        editDescription: null
      };

      editReview(review){
        console.log(review.public);
        this.setState({edit: true,
          editId: review.reviewId,
          editIsPublic: review.public,
          editMovie: review.movie,
          editRating: review.rating,
          editDescription: review.description
        });
      }



      componentWillMount = () => {    
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
        var array = this.state.reviews;
        array.forEach(element => {
          if(element.id == e.target.id.value){
            console.log(e.target.isPublic.value);
            element.isPublic = e.target.isPublic.value;
            element.title = e.target.title.value;
            element.rating = e.target.rating.value;
            element.description = e.target.description.value;
          }
        });
        this.setState({
          reviews: array,
          edit: null
        })
      }

      createReview(form){
        console.log("fs");
        form.preventDefault();
        var review = {
          "id": "88",
          "ownerUsername": "19kayla",
          "title": form.target.title.value,
          "rating": form.target.rating.value,
          "description": form.target.description.value
        }
        console.log(this.state.reviews)
        var list = this.state.reviews;
        list.push(review);
        this.setState({
          reviews: list
        })
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
              isPublic={this.state.editIsPublic}
              movie={this.state.editMovie}
              rating={this.state.editRating}
              description={this.state.editDescription}
           />
           <button type="button" onClick={()=> this.setState({edit: null})}>Close </button>
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