import './App.css';
import React, { useState } from "react"
import { useCookies } from 'react-cookie';
import axios from "axios";
import MasterPage from './Pages/MasterPage';



function App() {
  // const [name, setName] = useState('');
  // const [pwd, setPwd] = useState('');
  const [cookies, setCookie, removeCookies] = useCookies(['user']);
  const [error, setError] = useState();
  const logIn = (username, password) => {
    axios
      .patch("http://localhost:8089/user-service/signIn", {
        username: `${username}`,
        password: `${password}`,
      })
      .then((response) => {
        console.log(response.data);
        console.log(response.data.username)
        setCookie('ownerUsername', username, { path: '/' });
        window.location.reload(false);
      })
      .catch(function (error) {
        console.log(error);
        setError('Username and password dont match')
      });
  }
  const handleRemoveCookies = () => {
    console.log("test")
    removeCookies('ownerUsername');
    window.location.reload(false);
  }

  return (
    <div className="image">
      <MasterPage logIn={logIn.bind()} cookies={cookies} removeCookies={handleRemoveCookies.bind()} errorMessage={error} />
    </div>
  );
}

export default App;
