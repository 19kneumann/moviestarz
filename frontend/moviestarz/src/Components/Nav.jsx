import React, { Component } from "react";
import { Nav } from "react-bootstrap";

class NavBar extends Component {

  render() {
    return (
      <div className="navLinkBlock" >
        <a href="/home" >
          <img src="favicon.ico" alt="" className="logoIcon" />
        </a>
        {this.props.cookies.ownerUsername ?
          <Nav>
            <Nav.Link href="/" className="navLink"> Home </Nav.Link>  <br /> <br />
            <Nav.Link href="/feed" className="navLink"> Feed </Nav.Link> <br /> <br />
            <Nav.Link href="/watchlists" className="navLink"> Watchlists </Nav.Link> <br /> <br />
            <Nav.Link href="/account" className="navLink"> Account </Nav.Link> <br /> <br />
          </Nav>
          :
          <Nav>
            <Nav.Link onClick={()=>this.props.openModal("Sign Up")} className="navLink"> Sign Up </Nav.Link>  <br /> <br />
            <Nav.Link onClick={()=>this.props.openModal("Login")} className="navLink"> Log In </Nav.Link>  <br /> <br />
          </Nav>
        }
      </div>
    );
  }
}

export default NavBar;