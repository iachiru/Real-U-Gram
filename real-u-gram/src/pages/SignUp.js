import React, { useState, useNavigate } from "react";
import { useAuth } from "../context/authContext";

export default function SignUp() {
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
      setError(error.message);
    }
  };

  if (loading) return <div>Loading...</div>;

  if (error) return <div>{error}</div>;

  return (
    <form onSubmit={onSubmit}>
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
  );
}
