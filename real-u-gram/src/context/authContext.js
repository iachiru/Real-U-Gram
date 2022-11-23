import { createContext, useContext, useEffect, useState } from "react";
import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "../firebase/Firebase";

const AuthContext = createContext();

const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(); //user information stored
  const [userLoading, setUserLoading] = useState(true);

  const signUp = async ({ email, password }) => {
    await createUserWithEmailAndPassword(auth, email, password); // user registration
  };

  const logIn = async ({ email, password }) => {
    await signInWithEmailAndPassword(auth, email, password); // user login
  };

  const logOut = async () => {
    //user logout
    await auth.signOut();
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setUser(user);
      setUserLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const exports = {
    user,
    signUp,
    logIn,
    logOut,
    userLoading,
  };
  return (
    <AuthContext.Provider value={exports}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
export { useAuth };
