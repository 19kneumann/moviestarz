import React, { Component } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";

class AccountPage extends Component {
  state = {
    user: {},
    email: "",
    oldPassword: "",
    newPassword: ""
  }

  getUser = () => {
    var self = this;
    axios
      .get("http://localhost:8089/user-service/" + this.props.cookies.ownerUsername
      )
      .then((response) => {
        console.log(response.data)
        self.setState({ user: response.data });
      })
      .catch(function (error) {
        console.log("errorFetching");
      });
  };

  componentWillMount = () => {
    // var self = this;
    // axios
    //   .get("http://localhost:8089/user-service/" + this.props.cookies.ownerUsername
    //   )
    //   .then((response) => {
    //     console.log(response.data)
    //     self.setState({
    //       user: response.data,
    //       email: response.data.email
    //     });
    //   })
    //   .catch(function (error) {
    //     console.log("errorFetching");
    //   });
    // console.log(this.state.user)
    var self = this;

    let getWatchlists = axios.get("http://localhost:8089/watchlist-service/" + this.props.cookies.ownerUsername)
    let getUser = axios.get("http://localhost:8089/user-service/" + this.props.cookies.ownerUsername)
    let getReviews = axios.get("http://localhost:8089/review-service/" + this.props.cookies.ownerUsername)
    axios.all([getWatchlists, getUser, getReviews]).then(axios.spread((...responses) => {
      var watchlist = responses[0].data;
      var reviews = responses[2].data;
      var owned = [];
      var reviewOwned = [];
      watchlist.map((watchlist) => {
        if (watchlist.adminUsers.includes(this.props.cookies.ownerUsername) || watchlist.ownerUsername === this.props.cookies.ownerUsername) {
          owned.push(watchlist)
        }
      });

      reviews.map((review) => {
        if (review.ownerUsername === this.props.cookies.ownerUsername) {
          reviewOwned.push(watchlist)
        }
      });

      self.setState({
        watchlistCount: owned.length,
        friendCount: responses[1].data.friends.length,
        reviewCount: reviewOwned.length,
        user: responses[1].data,
        email: responses[1].data.email
      })
      self.seperateLists();
    })).catch(errors => {
    })
  }


  onChange = (evt) => {
    this.setState({
      error: false,
      [evt.target.name]: evt.target.value,
    },
      this.checkRegex
    );
  };

  checkRegex() {
    const password_pattern = /(?=.*[A-Z])(?=.*[\d])(?=.*[!@#$%^&*()\[\]{};:'"<>,.\/?])[\w\W]{8,}/;
    const email_pattern = /.*\w.*\w.*@.*\w.*\w.*[.].*\w.*\w.*/i;
    // console.log(this.state)

    if (!password_pattern.test(this.state.newPassword)) {
      this.setState({ error: true, errorMessage: "password needs to be  at least 8 characters and include one capitalized letter, one digit, and one special character !@#$%^&*()[]{};:'\"<>,./?.<br />" });
    }
    else if (this.state.newPassword != (this.state.newPasswordCheck)) {
      this.setState({ error: true, errorMessage: "passwords must match" });
    } else if (!email_pattern.test(this.state.email)) {
      this.setState({ error: true, errorMessage: "email have at least two characters, followed by an '@', then at least two characters, followed by a dot, and then at least two more characters.<br />" });
    } else {
      this.setState({
        error: false
      })
    }
  }

  Update = () => {
    var self = this;
    axios
      .patch("http://localhost:8089/user-service/updateUser", {
        ownerUsername: `${this.props.cookies.ownerUsername}`,
        oldPassword: `${this.state.oldPassword}`,
        newPassword: `${this.state.newPassword}`,
        email: `${this.state.email}`,
      })
      .then((response) => {
        self.getUser();
        console.log(response.data);
        self.setState({ editPassword: false, editEmail: false })
      })
      .catch(function (error) {
        self.setState({ wrongPassword: true })
        console.log(error);
      });
  }

  render() {
    console.log(this.state.user.username)
    return (
      <React.Fragment>

        <h2>Welcome {this.state.user.username}!!</h2>
        <div className="accountPage">
          {/* Welcome {this.props.cookies.ownerUsername} */}

          <div className="updateUser">
            <h4>Edit Your information!</h4>
            Password: ******** <Button variant="dark" onClick={() => this.setState({ editPassword: true, editEmail: false })}>Change</Button>
            <br />
            Email: {this.state.email} <Button variant="dark" onClick={() => this.setState({ editEmail: true, editPassword: false, newPassword: "" })}>Change</Button>
            <form>
              {this.state.editPassword &&
                <div>
                  <br/>
                  <br/>
                  <label>New Password:</label>
                  <br />
                  <input type="password" name="newPassword" onChange={this.onChange} />
                  <br />
                  <label>Confirm New Password:</label>
                  <br />
                  <input type="password" name="newPasswordCheck" onChange={this.onChange} />
                  <br />
                  <label>Enter Old Password:</label>
                  <br />
                  <input type="password" name="oldPassword" onChange={this.onChange} />
                  <br />
                  <br />
                  {this.state.error &&
                    <p>{this.state.errorMessage}</p>
                  }
                  {this.state.wrongPassword &&
                    <p>Uh oh, your old password didn't match up! Please try again</p>
                  }
                  <Button variant="dark" onClick={() => this.Update()}>Save</Button>
                  <Button variant="dark" id="marginLeft" onClick={() => this.setState({ editPassword: false })}>Close</Button>
                </div>
              }
              {this.state.editEmail &&
                <div>
                  <br/>
                  <br/>
                  <label>Email:</label>
                  <br />
                  <input type="text" name="email" onChange={this.onChange} value={this.state.email} />
                  <br />
                  <label>Confirm Password:</label>
                  <br />
                  <input type="password" name="passwordCheck" onChange={this.onChange} />
                  <br />
                  <br/>
                  {this.state.error &&
                    <p>{this.state.errorMessage}</p>
                  }
                  {this.state.wrongPassword &&
                    <p>Uh oh, your old password didn't match up! Please try again</p>
                  }
                  <Button variant="dark" onClick={() => this.Update()}>Save</Button>
                  <Button variant="dark" id="marginLeft" onClick={() => this.setState({ editEmail: false })}>Close</Button>
                </div>
              }
            </form>
          </div>
          <div className="stats">
            <h4>STATS!</h4>
            <span className="title"> Watchlists Owned/Admin : </span>
            {this.state.watchlistCount}
            <br />
            <span className="title"> Movies Reviewed: </span>
            {this.state.reviewCount}
            <br />
            <span className="title"> Number of Friends: </span>
            {this.state.friendCount}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default AccountPage;