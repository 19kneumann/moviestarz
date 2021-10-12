import React, { Component } from "react";
import { Nav } from "react-bootstrap";

class Login extends Component {

  render() {
    return (
        <Nav>
          {/* <Nav.Link href="/"> Home </Nav.Link> */}
          <Nav.Link href="/"> Start </Nav.Link>
          <Nav.Link href="/home"> Home </Nav.Link>
          <Nav.Link href="/feed"> Feed </Nav.Link>
          <Nav.Link href="/watchlists"> Watchlists </Nav.Link>
          <Nav.Link href="/account"> Account </Nav.Link>
        </Nav>
    );
  }
}

export default Login;