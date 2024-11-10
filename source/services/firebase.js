// services/firebase.js

import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs,
  updateDoc,
  doc
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAwSVzOep6mjAOor2k-lKYv4mFiL25SQFU",
    authDomain: "anastasia-dog-boarding-test.firebaseapp.com",
    projectId: "anastasia-dog-boarding-test",
    storageBucket: "anastasia-dog-boarding-test.firebasestorage.app",
    messagingSenderId: "1086955088175",
    appId: "1:1086955088175:web:53e19d83237a878c1619da",
    measurementId: "G-BCYN1RQ88J"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Auth functions
export const registerUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};

// Booking functions
export const submitBooking = async (bookingData) => {
  try {
    const docRef = await addDoc(collection(db, "bookings"), {
      ...bookingData,
      status: "pending",
      createdAt: new Date().toISOString()
    });
    return docRef.id;
  } catch (error) {
    throw error;
  }
};

export const updateBookingStatus = async (bookingId, status) => {
  try {
    const bookingRef = doc(db, "bookings", bookingId);
    await updateDoc(bookingRef, {
      status: status,
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    throw error;
  }
};

export { auth, db };