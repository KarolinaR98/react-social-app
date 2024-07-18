import { useEffect, useState } from 'react';
import './App.css';
import AppNav from './components/AppNav';
import AppRouters from './routes/AppRouters';
import axios from 'axios';

function App() {

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  axios.defaults.headers.common["Authorization"] =
    "Bearer " + (user ? user.jwt_token : "")
  axios.defaults.headers.post["Content-Type"] = "application/json"
 


  return (
    <div className="App">
      <AppNav user={user} />
      <AppRouters user={user} setUser={setUser}/>
    </div>
  );
}

export default App;
