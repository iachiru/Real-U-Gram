import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { processFirebaseErrors } from "../firebase/errors";

function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const navigate = useNavigate();

  const { logIn } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await logIn({ email, password });
      setLoading(false);
      navigate("/");
    } catch (error) {
      setLoading(false);
      console.log(error);
      setError(processFirebaseErrors(error.message));
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Link className="home" to="/">
        go home
      </Link>
      <div className="logoDiv">
        <img className="logoRUG" src="logoRUG.png" alt="logo real-u-gram" />
      </div>
      <div className="welcome">
        <h2 className="title">
          <span>Welcome back to Real-</span>
          <span className="title-word title-word-u">U</span>
          <span>-Gram</span>
        </h2>
        <h4>Where you can (and should!) be yourself</h4>
      </div>
      <form onSubmit={onSubmit}>
        {error && <div>{error}</div>}
        <div className="emailDiv">
          <input
            className="email"
            placeholder="e-mail address"
            type="text"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="passDiv">
          <input
            className="userPass"
            autoComplete="currentPassword"
            placeholder="password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="loginDiv2">
          <input type="submit" value="log in" className="loginButton" />
        </div>
      </form>
      <div className="littleSignupDiv">
        <p>
          don't have an account?{" "}
          <button className="littleSignup">
            <Link to="/SignUp">sign up</Link>
          </button>
        </p>
      </div>
      <div className="rightsLogin">
        <p>© FBW team - all rights reserved 2022 </p>
      </div>
    </>
  );
}

export default LogIn;
