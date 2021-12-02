import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
class CreateReview extends Component {

  state = {
    isPublic: "true",
    title: null,
    rating: "0.5",
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
          <Button onClick={() => this.closeModal()} className="closeModalBtn" variant="dark">X</Button>

            <Modal.Body>
              <form onSubmit={this.props.createReview}>

                Create a review for:
                <h4 className="plainPinkTitle">{this.props.movie.title}</h4>
                <br />

                {this.state.isPublic === "true" ?
                  '  \uD83D\uDD13'
                  :
                  ' 👥'
                }
                <select id="isPublic" name="isPublic" onChange={this.onChange} >
                  <option value="true">Public</option>
                  <option value="false">Friends Only</option>
                </select>
                <br />
                <br />
                <label>Rating:</label>
                <br />
                <img height="45px" width="200px" src={this.state.rating + ".png"} />
                <select id="rating" name="rating" onChange={this.onChange}>
                  <option value="0.5">.5</option>
                  <option value="1">1</option>
                  <option value="1.5">1.5</option>
                  <option value="2">2</option>
                  <option value="2.5">2.5</option>
                  <option value="3">3</option>
                  <option value="3.5">3.5</option>
                  <option value="4">4</option>
                  <option value="4.5">4.5</option>
                  <option value="5">5</option>
                </select>
                <br />
                <br />
                <label>Description:</label>
                <br />
                <textarea type="text" name="description" onChange={this.onChange} rows="4" cols="50" />
              </form>
            </Modal.Body>
            <Modal.Footer>
              <button onClick={() => this.props.createReview(this.state.isPublic, this.props.movie.title, this.state.rating, this.state.description, "https://image.tmdb.org/t/p/original" + this.props.movie.poster_path)}>Create Review </button>
            </Modal.Footer>
          </div>
        </Modal>

      </div>
    );
  }
}

export default CreateReview;