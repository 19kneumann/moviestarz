import React, { Component } from "react";
class CreateReview extends Component {

  state = {
    isPublic: null,
    title: null,
    rating: null,
    description: null
  };

  onChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  };


  render() {
    return (
      <div>
        <h1> CREATE REVIEW </h1>
        <form onSubmit={this.props.createReview}>
              <label>Visibility</label>
              <br/>
              <select id="isPublic" name="isPublic" onChange={this.onChange} >
                    <option value="true">Public</option>
                    <option value="false">Friends Only</option>
              </select>
              <br/>
              <label>Movie Title</label>
              <br/>
              <input type="text" name="movie" onChange={this.onChange}/>
              <br/>
              <label>Rating</label>
              <br/>
              <select id="rating" name="rating" onChange={this.onChange}>
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
              <br/>
              <label>Description</label>
              <br/>
              <input type="text" name="description" onChange={this.onChange}/>
        <button type="submit">Submit </button>
        </form>
      </div>
    );
  }
}

export default CreateReview;