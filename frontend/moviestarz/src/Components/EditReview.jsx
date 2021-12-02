import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
class CreateReview extends Component {


  state = {
    reviewId: null,
    ownerUsername: null,
    isPublic: null,
    movie: null,
    rating: null,
    description: null,
    show: true
  };

  componentWillMount = () => {
    this.setState({
      reviewId: this.props.reviewId,
      ownerUsername: this.props.ownerUsername,
      isPublic: this.props.isPublic,
      movie: this.props.movie,
      rating: this.props.rating.toString(),
      description: this.props.description,
      show: this.props.show
    })
  }
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
            <ModalHeader>
              <span>
              Edit your review for:
              <br/>
              <h4 className="plainPinkTitle">{this.props.movie}</h4>
              </span>
            </ModalHeader>
            <Modal.Body>
              <form onSubmit={this.props.updateReview}>

                {this.state.isPublic === "true" ?
                  '  \uD83D\uDD13'
                  :
                  ' 👥'
                }
                <select id="isPublic" name="isPublic" value={this.state.isPublic} onChange={this.onChange} >
                  <option value="true">Public</option>
                  <option value="false">Friends Only</option>
                </select>
                <br />
                {/* <input type="text" name="movie" value={this.state.movie} onChange={this.onChange} />
                <br /> */}
                <label>Rating</label>
                <br />
                <img height="45px" width="200px" src={this.state.rating + ".png"} />
                <select id="rating" name="rating" onChange={this.onChange} value={this.state.rating}>
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
                <label>Description</label>
                <br />
                <textarea type="text" name="description" value={this.state.description} onChange={this.onChange} rows="4" cols="50" />
              </form>

            </Modal.Body>
            <Modal.Footer>
              <button onClick={() => this.props.updateReview(this.state.reviewId, this.state.isPublic, this.props.movie, this.state.rating, this.state.description)}>Submit </button>
              <button onClick={() => this.props.deleteReview(this.props.reviewId)}>Delete </button>
              <button onClick={() => this.closeModal()}>Close</button>
            </Modal.Footer>
          </div>
        </Modal>
      </div>
    );
  }
}

export default CreateReview;