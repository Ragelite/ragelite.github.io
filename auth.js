import { auth, db } from "./firebase/firebase.js";
import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

export function protectPage(redirect = "index.html") {
  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      window.location.href = redirect;
      return;
    }

    const ref = doc(db, "users", user.uid);
    const snap = await getDoc(ref);

    if (!snap.exists()) {
      await setDoc(ref, {
        email: user.email,
        createdAt: serverTimestamp(),
        plan: "free"
      });
    }

    document.dispatchEvent(
      new CustomEvent("user-ready", {
        detail: { user, data: snap.data() || {} }
      })
    );
  });
}

export async function logout() {
  await signOut(auth);
  window.location.href = "index.html";
}

