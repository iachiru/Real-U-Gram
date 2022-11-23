import { serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import { createContext, useContext } from "react";
import {
  addDoc,
  collection,
  database,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "../firebase/Firebase";

const ProfileContext = createContext();

const useProfile = () => {
  return useContext(ProfileContext);
};

const ProfileProvider = ({ children }) => {
  //Create (POST) ADD
  const [userProfile, setUserProfile] = useState("");

  const addProfile = async (user) => {
    if (!user.userId) {
      throw new Error("User id is mandatory");
    }

    await addDoc(collection(database, "profiles"), {
      ...user,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  };

  //GET user profile

  const getUserProfile = async (userId) => {
    const colRef = collection(database, "profiles");
    const q = query(colRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setUserProfile(doc.data());
    });
  };

  const exports = { addProfile, getUserProfile, userProfile };
  return (
    <ProfileContext.Provider value={exports}>
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileProvider;
export { useProfile };
