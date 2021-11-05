import React, { Component } from "react";
class CreateReview extends Component {


  state = {
    reviewId: null,
    ownerUsername: null,
    isPublic: null,
    movie: null,
    rating: null,
    description: null
  };

  componentWillMount = () => {
    this.setState({
      reviewId: this.props.reviewId,
      ownerUsername: this.props.ownerUsername,
      isPublic: this.props.isPublic,
      movie: this.props.movie,
      rating: this.props.rating,
      description: this.props.description
    })
  }
  onChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  };


  render() {
    return (
      <div>
        <h1> EDIT REVIEW </h1>
        <form onSubmit={this.props.updateReview}>
          Id
          <br />
          <input type="text" name="reviewId" value={this.state.reviewId} readOnly />
          <br />
          Owner Username:
          <br />
          <input type="text" name="ownerUsername" value={this.state.ownerUsername} readOnly />
          <br />
          <label>Visibility</label>
          <br />
          <select id="isPublic" name="isPublic" value={this.state.isPublic} onChange={this.onChange} >
            <option value="true">Public</option>
            <option value="false">Friends Only</option>
          </select>
          <br />
          <label>Movie Title</label>
          <br />
          <input type="text" name="movie" value={this.state.movie} onChange={this.onChange} />
          <br />
          <label>Rating</label>
          <br />
          <select id="rating" name="rating" value={this.state.rating} onChange={this.onChange}>
            <option value=".5">.5 Stars</option>
            <option value="1">1 Stars</option>
            <option value="1.5">1.5 Stars</option>
            <option value="2">2 Stars</option>
            <option value="2.5">2.5 Stars</option>
            <option value="3">3 Stars</option>
            <option value="3.5">3.5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="4.5">4.5 Stars</option>
            <option value="5">5 Stars</option>
          </select>
          <br />
          <label>Description</label>
          <br />
          <input type="text" name="description" value={this.state.description} onChange={this.onChange} />
          <button type="submit">Submit </button>
        </form>
      </div>
    );
  }
}

export default CreateReview;