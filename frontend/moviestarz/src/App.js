import './App.css';
import React from "react"
import { useCookies } from 'react-cookie';
import axios from "axios";
import MasterPage from './Pages/MasterPage';


      
function App() {
  // const [name, setName] = useState('');
  // const [pwd, setPwd] = useState('');
  const [cookies, setCookie, removeCookies] = useCookies(['user']);

  const logIn = (username, password) => {
        axios
          // .patch("http://localhost:8089/user-service/signIn", {
            .patch("https://zuul-gateway-2pzdtmzjaa-uc.a.run.app/moviestarz/signIn", {
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
          }); 

        }
    const handleRemoveCookies = () =>{
      console.log("test")
      removeCookies('ownerUsername');
      window.location.reload(false);

    }
  return (
    <div>
      <MasterPage logIn={logIn.bind()} cookies={cookies} removeCookies={handleRemoveCookies.bind()}/>
    </div>
  );
}

export default App;
