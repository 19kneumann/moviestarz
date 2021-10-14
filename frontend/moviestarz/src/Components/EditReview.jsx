import React, { Component } from "react";
class CreateReview extends Component {

  render() {
    return (
      <div>
        <h1> EDIT REVIEW </h1>
        <form>
              <label>Visibility</label>
              <br/>
              <select id="isPublic" name="isPublic" >
                    <option value="true">Public</option>
                    <option value="false">Friends Only</option>
              </select>
              <br/>
              <label>Movie Title</label>
              <br/>
              <input type="text"/>
              <br/>
              <label>Rating</label>
              <br/>
              <select id="rating" name="rating">
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
              <input type="text"/>
        </form>
        <button>Create Review</button>
      </div>
    );
  }
}

export default CreateReview;