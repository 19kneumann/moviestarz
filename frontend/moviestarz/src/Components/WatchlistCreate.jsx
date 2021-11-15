import React, { Component } from "react";
import { Modal } from "react-bootstrap";
class WatchlistCreate extends Component {

  state = {
    isPublic: true,
    title: null,
    show: this.props.show
  };

  onChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  };

  closeModal(){
    this.setState({
      show: false
    })
    this.props.closeModal();
  }

  render() {
    return (
      <div>
        <Modal show={this.state.show} backdrop="static" className="ModalContainer" centered animation={false}>
          <div className="ModalContent">
            <h1> ADD USER </h1>
            <Modal.Body>
              <form onSubmit={this.props.createWatchlist}>
                <label>Visibility</label>
                <br />
                <select id="isPublic" name="isPublic" onChange={this.onChange} >
                  <option value="true">Public</option>
                  <option value="false">Friends Only</option>
                </select>
                <br />
                <label>Watchlist Title</label>
                <br />
                <input type="text" name="title" onChange={this.onChange} />
                <br />
                <button type="submit">Create Watchlist</button>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <button onClick={() => this.props.createWatchlist(this.state.isPublic, this.state.title)}>Create Watchlist</button>
              <button onClick={() => this.closeModal()}>Close</button>
            </Modal.Footer>
          </div>
        </Modal>
      </div>
    );
  }
}

export default WatchlistCreate;