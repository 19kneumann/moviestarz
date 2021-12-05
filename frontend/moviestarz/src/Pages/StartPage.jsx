import React, { Component } from "react";

class StartPage extends Component {
  state = {
    logIn: false,
    signUp: false,
    usernameTaken: false
  }

  constructor() {
    super();
    this.closeModal = this.closeModal.bind(this);
    this.logIn = this.logIn.bind(this);
  }


  closeModal() {
    this.setState({
      logIn: false,
      signUp: false
    })
  }
  logIn(username, password) {
    this.props.logIn(username, password)
  }

  render() {
    return (
      <div>
        <h1 className="welcomeTitle">  WELCOME TO MOVIESTARZ!!</h1>
        <div className="startContainer">
          <div className="startPageCard">
            <h4><span className="title">Features</span></h4>
            Friends!
            <ul>
              <li>Add friends to keep in touch</li>
              <li>Friends can see your reviews and be added to your watchlists</li>
            </ul>
            Reviews!
            <ul>
              <li>Review your favorite movies</li>
              <li>Share with the world or keep them to just your friends</li>
              <li>Comment on reviews to share your thoughts</li>
            </ul>
            Watchlists!
            <ul>
              <li>Create your own customized watchlists</li>
              <li>Add users to have them be able to edit it, or just add them as viewers</li>
              <li>Make your watchlist public to share your genius viewlist with the world</li>
            </ul>
            Stats!
            <ul>
              <li>See how many friends, watchlists, and reviews you have</li>
            </ul>
          </div>
          <div className="startPageCard" id="whyStart">
          <h4><span className="title">Why was it was made?</span></h4>
          <p>Moviestarz was created as part of a 10 week long class. The idea for Moviestarz stemmed from the idea that in a social sense, movies and other forms of media tend to lead the way. Each conversation seems to contain at least one portion talking about a new show you binged, or about a movie that just came out. So what if there was a website dedicated to sharing these thoughts with your friends
            
          </p>
          <p>Thus, Moviestarz was born. Now there is no need to reach out to ask what the name of that show was. You get instant recommendations from not only
            friends, but from the world as well. You can share your own recommendations as well, and share if you have any disagreements on their review. 
          </p>
          </div>
          <div className="startPageCard">
          <h4><span className="title">About the creator</span></h4>
          <p>My name is Kayla Neumann, and I am a third year student at Neumont College of Computer Science majoring in Software Engineering.
            As a SE student, my speciality with coding has a lot to do with the logic side of it, so the backend. This project was specially designed to not only
            showcase those skills, but to also push my creative limits in the design and css of a website. I have absolutely learned a lot in the making of this.
          </p>
          </div>
        </div>
      </div>
    );
  }
}

export default StartPage;