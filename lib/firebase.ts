import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBl6SYjXQrkBDpvmv04vaS2Zdx82KCZhM0",
  authDomain: "learnai-5da33.firebaseapp.com",
  projectId: "learnai-5da33",
  storageBucket: "learnai-5da33.firebasestorage.app",
  messagingSenderId: "936613703151",
  appId: "1:936613703151:web:42569190009483a4795a1a",
  measurementId: "G-109FNSFV4Z",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()

export default app
