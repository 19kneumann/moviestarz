import React, { Component } from "react";
import ReviewCard from "./ReviewCard";
import axios from "axios";
import CreateReview from "./CreateReview";

class Reviews extends Component {

    state = {
        reviews: [],
      };

      editReview(review){
        console.log(review.id);
      }

      componentDidMount = () => {    
        // axios
        //   .get("https://api.themoviedb.org/3/discover/movie?api_key=af69558f05513147c6444f75dd27b6a1&language=en-US&sort_by=popularity.desc"
        //   )
        //   .then((response) => {
        //     console.log(response.data);
        //     this.setState({ movies: response.data.results });
        //   })
        //   .catch(function (error) {
        //     console.log("errorFetching");
        //   });

        var reviewList = [
            {"id": "1",
            "ownerUsername": "19kayla",
            "isPublic": "true",
            "title": "idk",
            "rating": "4.3",
            "description": "this is a description"
        }, 
        {"id": "10",
        "ownerUsername": "19kayla",
            "isPublic": "false",
            "title": "hehe",
            "rating": "2",
            "description": "blahh"
        }
        ]
        this.setState({ reviews: reviewList})
      };


  render() {
    return (
      <div>
          {this.state.reviews.map((review) => (
              <React.Fragment key={review.id}>
            <ReviewCard 
            id={review.id}
            ownerUsername={review.ownerUsername}
            isPublic={review.isPublic}
            title={review.title}
            rating={review.rating}
            description={review.description}
            >
            </ReviewCard>
            <button onClick={() => this.editReview(review)}>Edit</button>
            <br/><br/>
            </React.Fragment>
          ))}
      </div>
    );
  }
}

export default Reviews;