import { useNavigate } from "react-router-dom";
import "./App.css";
import { useAuth } from "./context/authContext";

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
      <div className="App">
        <h1>Welcome to Real-U-Gram!</h1>
        <h4>Where you can (and should!) be yourself</h4>
      </div>
      <button onClick={() => navigate("/login")}>Log In</button>
      <button onClick={() => navigate("/signup")}>Sign Up</button>
    </div>
  );
}

export default App;
