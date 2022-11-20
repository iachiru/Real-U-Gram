export const processFirebaseErrors = (msg) => {
  switch (msg) {
    case "Firebase: Error (auth/email-already-in-use).":
      return "Email is already in use";
    case "Firebase: Error (auth/invalid-email).":
      return "Email is invalid, please make sure the information is correct.";
    case "Firebase: Error (auth/internal-error).":
      return "Cannot process request";
    case "Firebase: Password should be at least 6 characters (auth/weak-password).":
      return "Password should be at least 6 characters";
    default:
      return msg;
  }
};
