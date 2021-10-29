import React, { Component } from "react";
import Movies from "../Components/Movies";


class HomePage extends Component {

  render() {
    return (
		<div>
      <p>Home Page</p>
      <Movies cookies={this.props.cookies}></Movies>
    </div>
    );
  }
}

export default HomePage;