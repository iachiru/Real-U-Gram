import { deleteDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { useState } from "react";
import { createContext, useContext } from "react";
import {
  addDoc,
  collection,
  database,
  doc,
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
  const [userProfile, setUserProfile] = useState();

  const addProfile = async (profile) => {
    if (!profile.userId) {
      throw new Error("User id is mandatory");
    }

    await addDoc(collection(database, "profiles"), {
      ...profile,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  };

  //GET user profile

  const getUserProfile = async (userId) => {
    const q = query(
      collection(database, "profiles"),
      where("userId", "==", userId)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      setUserProfile({ ...data, id: doc.id });
    });
  };

  //Update profile

  const editUserProfile = async (profile) => {
    if (!profile.id) {
      throw new Error("Profile needs an id");
    }
    const docRef = doc(database, "profiles", profile.id);

    try {
      await setDoc(docRef, {
        ...profile,
        updatedAt: serverTimestamp(),
      });
      console.log(profile);
    } catch (err) {
      console.log(err);
    }
  };

  //Delete

  const deleteUserProfile = async (profileId) => {
    const docRef = doc(database, "profiles", profileId);
    await deleteDoc(docRef);
  };

  const clearProfile = () => {
    setUserProfile(null);
  };

  const exports = {
    addProfile,
    getUserProfile,
    userProfile,
    editUserProfile,
    deleteUserProfile,
    clearProfile,
  };
  return (
    <ProfileContext.Provider value={exports}>
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileProvider;
export { useProfile };
