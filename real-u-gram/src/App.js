import { useNavigate } from "react-router-dom";
import "./App.css";
import { useAuth } from "./context/authContext";

//import logo from "./logo

//function logotype() {
//return (
// <div className="logo">
//   <img src={logo.src} alt="backgroundpicture" />
//  </div>
//) );
//}*/
//logotype(logo);*

function App() {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  if (user)
    return (
      <div className="hello">
        <h2>Hello {user.email}</h2>
        <button onClick={logOut}>Log Out</button>
        <button onClick={() => navigate("/profile")}>Profile</button>
      </div>
    );
  return (
    <div>
      <img src="logoRUG.png" alt="backgroundpicture" />
      <div className="Welcome">
        <h1>Welcome to Real-U-Gram!</h1>
        <h4>Where you can (and should!) be yourself</h4>
      </div>
      <div className="loginDiv">
        <button className="loginButton" onClick={() => navigate("/login")}>
          log in
        </button>
      </div>
      <div className="signupDiv">
        <button className="signupButton" onClick={() => navigate("/signup")}>
          sign up
        </button>
      </div>
      <div>
        <footer>
          <p>© FBW team - all rights reserved 2022 </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
