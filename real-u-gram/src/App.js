import { useNavigate } from "react-router-dom";
import "./App.css";
import { useAuth } from "./context/authContext";
import Feed from "./pages/Feed";

function App() {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  if (user)
    return (
      <div>
        <div className="hello">
          <h2>Hello {user.email}</h2>
          <div className="logoDiv">
            <img
              className="logoRUGminiFeed"
              src="logoRUG.png"
              alt="logo real-u-gram"
            />
          </div>
        </div>
        <div className="buttonsFeed">
          <button className="logoutButton" onClick={logOut}>
            log out
          </button>
          <button
            className="profileButton"
            onClick={() => navigate("/profile")}>
            profile
          </button>
        </div>

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
          <span>Real-</span>
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
