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

  const signUp = async ({ email, password }) => {
    await createUserWithEmailAndPassword(auth, email, password); // user registration
  };

  const logIn = async ({ email, password }) => {
    await signInWithEmailAndPassword(auth, email, password); // user login
  };

  const logOut = async () => {
    //user logout
    await auth.logout();
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setUser(user);
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
  };
  return (
    <AuthContext.Provider value={exports}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
export { useAuth };
