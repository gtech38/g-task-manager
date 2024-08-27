import { auth, firestore } from "../../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getDoc, setDoc, doc, collection } from "firebase/firestore";

export default async (req, res) => {
  if (req.method === "POST") {
    const { email, password } = req.body;
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;
      // Create user document in TaskManager collection
      await setDoc(doc(firestore, "TaskManager", user.uid), {
        UserID: user.uid,
        Username: email.split("@")[0],
      });

      // Initialize Tasks subcollection
      const tasksCollectionRef = collection(
        firestore,
        "TaskManager",
        user.uid,
        "Tasks"
      );

      await setDoc(doc(tasksCollectionRef, "init"), { initialized: true });

      res.status(201).json({ user: userCredential.user });
    } catch (error) {
      console.error("Error creating user:", error.message); // Log the error
      res.status(400).json({ error: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
