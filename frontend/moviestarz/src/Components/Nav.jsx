import React, { Component } from "react";
import { Nav } from "react-bootstrap";

class NavBar extends Component {

  render() {
    return (
      <div className="navLinkBlock" >
        <a href="/home" >
          <img src="favicon.ico" alt="" className="logoIcon" />
        </a>
        <Nav>
          <Nav.Link href="/home" className="navLink"> Home </Nav.Link>  <br /> <br />
          <Nav.Link href="/feed" className="navLink"> Feed </Nav.Link> <br /> <br />
          <Nav.Link href="/watchlists" className="navLink"> Watchlists </Nav.Link> <br /> <br />
          <Nav.Link href="/account" className="navLink"> Account </Nav.Link> <br /> <br />
        </Nav>
      </div>
    );
  }
}

export default NavBar;