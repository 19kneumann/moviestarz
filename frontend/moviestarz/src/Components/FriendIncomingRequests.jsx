import React, { Component } from "react";
import { Modal, ModalBody } from "react-bootstrap";
import { Button } from "react-bootstrap";
import ModalHeader from "react-bootstrap/esm/ModalHeader";

class IncomingRequests extends Component {

  state = {
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
        <Modal show={this.props.show} backdrop="static" className="ModalContainer" centered animation={false}>
          <div className="ModalContent">
            <ModalHeader>Incoming Friend Requests</ModalHeader>
            <Modal.Body>
              {this.props.pending.length === 0 ?
                <p> No incoming requests </p>
                :
                <div>
                  {this.props.pending.map((user) => (
                    <React.Fragment key={user}>
                      <br />

                      {user}
                      { } <Button type="button" className="" variant="dark" onClick={() => this.props.sendResponse(user, "accepted")}>Accept</Button>
                      { } <Button type="button" className="" variant="dark" onClick={() => this.props.sendResponse(user, "denied")}>Deny</Button>
                      <br />
                    </React.Fragment>
                  ))}
                </div>
              }
              {this.props.error &&
                <p>{this.props.error}</p>
              }
            </Modal.Body>
            <Modal.Footer>
              <button onClick={() => this.closeModal()}>Close</button>
            </Modal.Footer>
          </div>
        </Modal>
      </div>
    );
  }
}

export default IncomingRequests;