import { initializeApp } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

import { getAuth } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import { getFirestore } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

export const firebaseConfig = {
  apiKey: "AIzaSyDDEuW9B7CdfVXslSMvxFBRVPIlcFjHqXs",
  authDomain: "rageauth-174a5.firebaseapp.com",
  projectId: "rageauth-174a5",
  appId: "1:485170234605:web:2cd934b30ab0de678f38e4"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
