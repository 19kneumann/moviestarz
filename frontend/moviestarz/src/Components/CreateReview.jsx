import React, { Component } from "react";
import { Modal } from "react-bootstrap";
class CreateReview extends Component {

  state = {
    isPublic: true,
    title: null,
    rating: ".5",
    description: "",
    show: true
  };

  onChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  };

  closeModal() {
    this.setState({ show: false });
    this.props.closeModal();
  }

  render() {
    return (
      <div>
        <Modal show={this.state.show} backdrop="static" className="ModalContainer" centered animation={false}>
          <div className="ModalContent">
            <Modal.Body>
              <form onSubmit={this.props.createReview}>
                <label>Visibility</label>
                <br />
                <select id="isPublic" name="isPublic" onChange={this.onChange} >
                  <option value="true">Public</option>
                  <option value="false">Friends Only</option>
                </select>
                <br />
                <label>Movie Title</label>
                <br />
                <input type="text" name="movie" value={this.props.movie.title} readOnly />
                <br />
                <label>Rating</label>
                <br />
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
                <br />
                <label>Description</label>
                <br />
                <input type="text" name="description" onChange={this.onChange} />
              </form>
            </Modal.Body>
            <Modal.Footer>
              <button onClick={() => this.props.createReview(this.state.isPublic, this.props.movie.title, this.state.rating, this.state.description, "https://image.tmdb.org/t/p/original" + this.props.movie.poster_path)}>Submit </button>
              <button onClick={() => this.closeModal()}>Close</button>
            </Modal.Footer>
          </div>
        </Modal>

      </div>
    );
  }
}

export default CreateReview;