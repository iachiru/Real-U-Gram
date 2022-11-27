import { useNavigate } from "react-router-dom";
import "./App.css";
import { useAuth } from "./context/authContext";
import Feed from "./pages/Feed";

function App() {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  if (user)
    return (
      <div className="hello">
        <h2>Hello {user.email}</h2>
        <button onClick={logOut}>Log Out</button>
        <button onClick={() => navigate("/profile")}>Profile</button>
        <Feed />
      </div>
    );
  return (
    <div>
      <div className="logoDiv">
        <img className="logoRUG" src="logoRUG.png" alt="logo real-u-gram" />
      </div>
      <div className="welcome">
        <h1 className="title">
          <span>Welcome to Real-</span>
          <span className="title-word title-word-u">U</span>
          <span>-Gram</span>
        </h1>
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
      {/*  <div className="timeline">
        {posts.map((post) => (
          <Post
            username={post.username}
            caption={post.caption}
            imageUrl={post.image}
          />
        ))}
      </div> */}
      <div className="rightsApp">
        <p>© FBW team - all rights reserved 2022 </p>
      </div>
    </div>
  );
}

export default App;
