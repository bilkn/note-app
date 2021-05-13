import React, { useEffect, useState } from 'react';
import { FirebaseAuthContext } from '../context';
import { auth } from '../lib/firebase.dev';
import firebase from 'firebase';
export default function FirebaseAuthProvider({ children, ...restProps }) {
  const [currentUser, setCurrentUser] = useState(auth?.currentUser || null);

  const signup = (email, password) =>
    auth.createUserWithEmailAndPassword(email, password);

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .catch((err) => {
        console.log(err);
      });
  };

  const signin = (email, password) =>
    auth.signInWithEmailAndPassword(email, password);

  const signout = () => auth.signOut();

  const resetPassword = (email) => auth.sendPasswordResetEmail(email);

  const updateEmail = async (email, password) => {
    await reauth(password);
    await currentUser.updateEmail(email);
  };

  const updatePassword = async (oldPassword, newPassword) => {
    await reauth(oldPassword);
    await currentUser.updatePassword(newPassword);
  };

  const updateProfile = (props) => currentUser.updateProfile({ ...props });

  const getUserCredential = (password) =>
    firebase.auth.EmailAuthProvider.credential(
      currentUser.email,
      '' + password
    );

  const reauth = async (password) => {
    const credential = getUserCredential(password);
    await currentUser.reauthenticateWithCredential(credential);
  };

  const deleteAccount = async (password) => {
    await reauth(password);
    await currentUser.delete();
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    signInWithGoogle,
    signin,
    signout,
    resetPassword,
    updateEmail,
    updatePassword,
    updateProfile,
    deleteAccount
  };
  return (
    <FirebaseAuthContext.Provider value={value} {...restProps}>
      {children}
    </FirebaseAuthContext.Provider>
  );
}
