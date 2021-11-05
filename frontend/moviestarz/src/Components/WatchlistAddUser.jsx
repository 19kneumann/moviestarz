import React, { Component } from "react";
class WatchlistAddUser extends Component {

  state = {
    isPublic: null,
    id: null,
    title: null,
    rating: null,
    description: null,
    isAdmin: null
  };

  onChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  };


  render() {
    return (
      <div>
        <h1> ADD USER </h1>
        <form onSubmit={this.props.addUser}>
          <input type="text" name="id" value={this.props.id} readOnly />
          <br />
          <label>Permissions</label>
          <br />
          <select id="isAdmin" name="isAdmin" onChange={this.onChange} >
            <option value="true">Admin</option>
            <option value="false">Viewer</option>
          </select>
          <br />
          <label>Username</label>
          <br />
          <input type="text" name="user" onChange={this.onChange} />
          <br />
          <button type="submit">Add User</button>
        </form>
      </div>
    );
  }
}

export default WatchlistAddUser;