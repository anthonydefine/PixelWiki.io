import React, { useState, useEffect, createContext } from "react";
import { auth, db } from "./firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { collection, doc, getDoc, setDoc, updateDoc, addDoc, getDocs, query, serverTimestamp } from "firebase/firestore";

const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUid, setCurrentUid] = useState(null);

  const [showAviModal, setShowAviModal] = useState(false);
  const [showDiplaynameModal, setShowDisplaynameModal] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [aviUrl, setAviUrl] = useState('');

  const [showToast, setShowToast] = useState(false);
  const [userToast, setUserToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  //Current database user
  const getUserDoc = async (user) => {
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setCurrentUser(docSnap.data())
    } else {
      console.log('no such doc') 
    }
  };

  //Add game to library
  const addToLibrary = async (props) => {
    const userRef = doc(db, 'users', currentUid);
    const gameLibraryRef = collection(userRef, 'gameLibrary');
    const gameData = {
      gameName: props.name,
      photo: props.background_image,
      rating: props.rating,
      released: props.released,
      genres: props.genres,
      timestamp: serverTimestamp(),
    };
    try {
      await addDoc(gameLibraryRef, gameData);
      setUserToast(false);
      setShowToast(true);
      setToastMessage('Successfully added game to library!');
      setTimeout(() => {
        setShowToast(false);
      }, 5000);
    } catch (error) {
      console.error('Error adding game: ', error);
    }
  };

  //fetch game library
  const fetchGameLibrary = async () => {
    const gameLibraryRef = collection(db, 'users', currentUid, 'gameLibrary');
    const q = query(gameLibraryRef);
  
    try {
      const querySnapshot = await getDocs(q);
      const games = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        games.push({ id: doc.id, ...doc.data() });
      });
      return games;
    } catch (error) {
      console.error('Error fetching game library:', error);
      return [];
    }
  };

    //User signup signin signout
    const createUser = async (e) => {
      e.preventDefault();
      await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setDoc(doc(db, 'users', userCredential.user.uid), {
          aviUrl: '',
          screenName: '',
          email: userCredential.user.email,
          id: userCredential.user.uid,
        });
      })
      .catch((error) => {
        console.log('error')
      })
      e.target.reset();
    };

  const loginUser = async (e) => {
    e.preventDefault();
    await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      setCurrentUser(userCredential.user)
      console.log('you have been signed in')
    })
    .catch((error) => {
      console.log('error')
    })
    e.target.reset();
    setUserToast(true);
    setShowToast(true);
    setToastMessage('You have been signed in!');
    setTimeout(() => {
      setShowToast(false);
    }, 5000);
  }

  const signout = () => {
    signOut(auth);
    setCurrentUser(null);
    setUserToast(true);
    setShowToast(true);
    setToastMessage('You have been signed out!');
    setTimeout(() => {
      setShowToast(false);
    }, 5000);
  };

  //Change user avatar
  const changeAvatar = async (e) => {
    const docRef = doc(db, 'users', `${currentUid}`);
    e.preventDefault();
    updateDoc(docRef, {
      aviUrl: aviUrl
    });
    setUserToast(false);
    setShowToast(true);
    setToastMessage('You have changed your avatar!');
    setTimeout(() => {
      setShowToast(false);
    }, 5000);
  };

  //Change user Displayname
  const changeDisplayname = async (e) => {
    const docRef = doc(db, 'users', `${currentUid}`);
    e.preventDefault();
    updateDoc(docRef, {
      screenName: displayName
    });
    setUserToast(false);
    setShowToast(true);
    setToastMessage('You have updated your Username!');
    setTimeout(() => {
      setShowToast(false);
    }, 5000);
  };

  //Select Dashboard games
  const gameDashSelection = [
    {id: 1, name: "Best of 2021", value: "games?dates=2021-01-01,2021-12-31&ordering=-added&"},
    {id: 2, name: "Best of 2022", value: "games?dates=2022-01-01,2022-12-31&ordering=-added&"},
    {id: 3, name: "Best of 2023", value: "games?dates=2023-01-01,2023-12-31&ordering=-added&"},
    {id: 4, name: "Must Play", value: "collections/must-play/games&"},
    {id: 5, name: "Popular", value: "collections/lists/popular?"},
    {id: 6, name: "Upcoming", value: "games?dates=2023-10-10,2024-12-31&ordering=-added&"},
  ]
  const [chosenSelection, setChosenSelection] = useState("games?dates=2023-10-10,2024-12-31&ordering=-added&");
  const [chosenTitle, setChosenTitle] = useState("Upcoming")

  const contextValue = { currentUser, setCurrentUser, currentUid, setCurrentUid, email, setEmail, 
    password, setPassword, displayName, setDisplayName, createUser, loginUser, signout, fetchGameLibrary,
    getUserDoc, addToLibrary, showAviModal, setShowAviModal, aviUrl, setAviUrl, changeAvatar, showDiplaynameModal,
    setShowDisplaynameModal, changeDisplayname, showToast, setShowToast, toastMessage, setToastMessage, userToast,
    chosenSelection, setChosenSelection, gameDashSelection, setChosenTitle, chosenTitle, isLoading, setIsLoading };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  )
};

export { AuthContext, AuthContextProvider }