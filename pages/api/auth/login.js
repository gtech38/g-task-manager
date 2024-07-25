import { auth } from "../../../firebase";
import {
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
  browserLocalPersistence,
} from "firebase/auth";

// API route for handling user login
export default async (req, res) => {
  if (req.method === "POST") {
    const { email, password } = req.body;
    try {
      // Set persistence to session
      await setPersistence(auth, browserLocalPersistence);

      // Sign in with Firebase
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Send back user data
      res.status(200).json({ user });
    } catch (error) {
      // res.status(401).json({ error: error.message });
      if (error.code === "auth/user-not-found") {
        res.status(401).json({ error: "Email is not registered" });
      } else if (error.code === "auth/wrong-password") {
        res.status(401).json({ error: "Incorrect password" });
      } else if (error.code === "auth/invalid-credential") {
        res.status(401).json({ error: "User has not been registered" });
      } else {
        res.status(401).json({ error: error.message });
      }
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
