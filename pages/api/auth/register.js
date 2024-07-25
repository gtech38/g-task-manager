import { auth } from "../../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default async (req, res) => {
  if (req.method === "POST") {
    const { email, password } = req.body;
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
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
