import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export const login = () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  auth.useDeviceLanguage();
  signInWithPopup(auth, provider).then(({ additionalUserInfo, user }) => {
    //   if (true || additionalUserInfo?.isNewUser) {
    //     getAuth()
    //       .firestore()
    //       .collection("users")
    //       .doc(user?.uid)
    //       .set({ content: [] });
    //   }
  });
};
