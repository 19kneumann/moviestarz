import React, { Component } from "react";
import { Modal, ModalBody } from "react-bootstrap";
import { Button } from "react-bootstrap";
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
              <Modal.Body>
                {this.props.pending.length === 0 ?
                  <p> no incoming requests </p>
                  :
                  <div>
                    {this.props.pending.map((user) => (
                      <React.Fragment key={user}>
                        {user}
                        <Button type="button" className="actionIcons" variant="dark" onClick={() => this.props.sendResponse(user, "accepted")}>yes</Button>
                        <Button type="button" className="actionIcons" variant="dark" onClick={() => this.props.sendResponse(user, "denied")}>no</Button>
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