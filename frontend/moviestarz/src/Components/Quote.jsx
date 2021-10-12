import React, { Component } from "react";

class Quote extends Component {


    state = {quote: ""};
  render() {
    return (
      <div>
          {this.state.quote}
      </div>
    );
  }
}

export default Quote;