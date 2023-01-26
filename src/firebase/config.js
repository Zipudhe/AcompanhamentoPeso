import { initializeApp } from 'firebase/app'
import '@firebase/auth';
import { getFirestore } from 'firebase/firestore';

import {
  API_KEY,
  AUTHDOMAIN,
  PROJECT_ID,
  STORAGE_BUCKET,
  MEASUREMENT_ID,
  MESSAGING_SENDER,
  APP_ID
} from "@env"

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTHDOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID
};


export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
