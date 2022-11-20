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
      <Link to="/">Go Home</Link>
      <form onSubmit={onSubmit}>
        <h1>Sign Up</h1>
        {error && <div>{error}</div>}
        <label>Email</label>
        <input
          type="text"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <input type="submit" value="Submit" />
      </form>
      <p>
        Already a member? <Link to="/login">Log In</Link>
      </p>
    </>
  );
}

export default SignUp;
