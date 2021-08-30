import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const auth = getAuth();

export const login = () => {
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

export const logout = () => signOut(auth);
