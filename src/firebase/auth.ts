import {
  getAuth,
  updateProfile,
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import { app } from "./init";
import { createUser } from "../api/api";

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export const getCurrentUser = async () => {
  const promisifiedOnAuthStateChanged = (auth: Auth): Promise<User | null> => {
    return new Promise((resolve, reject) => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          resolve(user);
        } else {
          resolve(null);
        }
      });
    });
  };

  const user = await promisifiedOnAuthStateChanged(auth);
  return user;
};

export const signUpUser = async ({email, password, formData}:{email: string; password: string; formData: any}) => {
  try {
    const user = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(auth.currentUser as User, { displayName: `${formData.fname} ${formData.lname}` });
    await createUser({ uid: user.user.uid });
    return user.user;
  } catch (error) {
    console.error(error);
  }
};

export const signInUser = async ({email, password}:{email: string; password: string}) => {
  try {
    const user = await signInWithEmailAndPassword(auth, email, password);
    console.log(user);
  } catch (error) {
    console.error(error);
  }
};

export const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error(error);
  }
};
