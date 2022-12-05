import { getDatabase, push, query, ref, set } from "firebase/database";
import { getStorage } from "firebase/storage";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


// TODO: Replace with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const storage = getStorage();
export const auth = getAuth(app);

export function favouriteVerses(info) {
  const myUserId = auth.currentUser.uid;
  const favouritesListRef = ref(database, 'favourites/' + myUserId);
  const newFavouriteVerses = push(favouritesListRef);
  return set(newFavouriteVerses, info);
}

export function retrieveFavouriteVerses(){
    const myUserId = auth.currentUser.uid;
    const result = ref(database, 'favourites/' + myUserId);
    return result;
}