import { useAuth0 } from "@auth0/auth0-react";
import logo from './logo.svg';
import './App.css';

function App() {
  const { user, loginWithRedirect, isAuthenticated, logout }= useAuth0();

  console.log("Current User",user);

  return (
    <div className="App">
      <header className="App-header">
        {isAuthenticated &&<h3 className="user-name"> Hello, {user.name}</h3>}

        {isAuthenticated ? (
          <button onClick={(e)=>logout()}>Logout</button>
        )
        
      :(<button onClick={(e)=>loginWithRedirect()} className="App-header">
          Login With Redirect
        </button>) }


        

      </header>
    </div>
  );
}

export default App;
