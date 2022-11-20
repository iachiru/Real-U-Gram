import { serverTimestamp } from "firebase/firestore";
import { createContext, useContext } from "react";
import { addDoc, collection, database } from "../firebase/Firebase";

const ProfileContext = createContext();

const useProfile = () => {
  return useContext(ProfileContext);
};

const ProfileProvider = ({ children }) => {
  //Create (POST) ADD

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

  const exports = { addProfile };
  return (
    <ProfileContext.Provider value={exports}>
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileProvider;
export { useProfile };
