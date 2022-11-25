import { inMemoryPersistence } from "firebase/auth";
import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { processFirebaseErrors } from "../firebase/errors";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const navigate = useNavigate();

  const { signUp } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await signUp({ email, password });
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
      <div className="Welcome">
        <h1>Welcome to Real-U-Gram!</h1>
        <h4>Where you can (and should!) be yourself</h4>
      </div>
      <form onSubmit={onSubmit} className="signupForm">
        {error && <div>{error}</div>}
        <div className="emailDiv">
          <input
            className="email"
            type="text"
            placeholder="e-mail address"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="passDiv">
          <input
            type="password"
            className="pass"
            placeholder="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="signupDiv">
          <input type="submit" value="sign up" className="signupButton" />
        </div>
      </form>
      <div className="littleLoginDiv">
        <p>
          Already a member?{" "}
          <button className="littleLogin">
            <Link to="/login">log in</Link>
          </button>
        </p>
      </div>
      <div className="rightsSignup">
        <p>© FBW team - all rights reserved 2022 </p>
      </div>
    </>
  );
}

export default SignUp;
