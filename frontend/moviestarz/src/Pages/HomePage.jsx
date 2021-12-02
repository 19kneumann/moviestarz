import React, { Component } from "react";
import Movies from "../Components/Movies";


class HomePage extends Component {

  render() {
    return (
		<div>
      <Movies cookies={this.props.cookies}></Movies>
    </div>
    );
  }
}

export default HomePage;