import React, { Component } from "react";

class AccountPage extends Component {

  render() {
    return (
		<div>
      <button onClick={this.props.removeCookies}>Sign out</button>
    </div>
    );
  }
}

export default AccountPage;