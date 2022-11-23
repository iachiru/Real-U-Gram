import { useEffect } from "react";
import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { useProfile } from "../context/ProfileContext";
import { processFirebaseErrors } from "../firebase/errors";
import { addProfile } from "../context/ProfileContext";

function Users() {
  const [profile, setProfile] = useState({
    name: "",
    alias: "",
    city: "",
    bio: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const navigate = useNavigate();

  const { addProfile, getUserProfile, userProfile } = useProfile();
  const { user, userLoading } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!profile.name) {
      return setError("Name is required");
    }

    if (!profile.city) {
      return setError("City is required");
    }

    setError("");

    try {
      setLoading(true);
      await addProfile({ ...profile, userId: user.uid });
      setLoading(false);
      navigate("/");
    } catch (error) {
      setLoading(false);
      console.log(error);
      setError(processFirebaseErrors(error.message));
    }
  };

  useEffect(() => {
    if (user) getUserProfile(user.uid);
  }, [user, getUserProfile]);

  useEffect(() => {
    if (!user && !userLoading) {
      navigate("/login");
    }
  }, [user, userLoading, navigate]);

  if (loading || userLoading) return <div>Loading...</div>;

  if (userProfile)
    return (
      <div>
        <h1>{userProfile.name}</h1>
        <p>{userProfile.alias}</p>
        <p>{userProfile.city}</p>
        <p>{userProfile.bio}</p>
        <button>Edit</button>
      </div>
    );

  return (
    <>
      <Link to="/">Go Home</Link>
      <form onSubmit={onSubmit}>
        <h1>Profile</h1>
        {error && <div>{error}</div>}
        <label>Name</label>
        <input
          type="text"
          value={profile.name}
          onChange={(e) => {
            setProfile({ ...profile, name: e.target.value });
          }}
        />
        <label>Alias</label>
        <input
          type="text"
          value={profile.alias}
          onChange={(e) => {
            setProfile({ ...profile, alias: e.target.value });
          }}
        />
        <label>City</label>
        <input
          type="text"
          value={profile.city}
          onChange={(e) => {
            setProfile({ ...profile, city: e.target.value });
          }}
        />
        <label>Biography</label>
        <input
          type="text"
          value={profile.bio}
          onChange={(e) => {
            setProfile({ ...profile, bio: e.target.value });
          }}
        />

        <input type="submit" value="Submit" />
      </form>
    </>
  );
}

export default Users;
