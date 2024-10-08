import { firestore } from "../../../firebase";
import {
  collection,
  getDocs,
  addDoc,
  Timestamp,
  orderBy,
  query,
  limit,
} from "firebase/firestore";

// Helper function to format the firebase timestamp DueDate to a Javascript Date yyyy-MM-dd
const formatDate = (firebaseTimestamp) => {
  const date = firebaseTimestamp.toDate();
  const d = new Date(date);
  const month = `${d.getMonth() + 1}`.padStart(2, "0");
  const day = `${d.getDate()}`.padStart(2, "0");
  const year = d.getFullYear();
  return `${year}-${month}-${day}`;
};

export default async (req, res) => {
  const { userId } = req.query; // Retrieve userId from query parameters
  if (req.method === "GET") {
    try {
      if (!userId) {
        res.status(401).json({ error: "Unauthorized" });
        return;
      }

      const first = query(
        collection(firestore, "TaskManager", userId, "Tasks"),
        orderBy("DueDate"),
        limit(25)
      );
      const snapshot = await getDocs(first);

      let lastDocument = snapshot.docs[snapshot.docs.length - 1];

      // Convert Firestore timestamps to JavaScript Date objects
      const tasks = snapshot.docs.map((doc) => {
        const data = doc.data();

        return {
          TaskID: doc.id,
          ...data,
          DueDate: formatDate(data.DueDate), // Convert Firestore Timestamp to JavaScript Date
        };
      });

      res.status(200).json(tasks);
    } catch (error) {
      // Log the error to understand what went wrong
      console.error("Error fetching tasks:", error.message);
      res.status(500).json({ error: "Failed to fetch tasks" });
    }
  } else if (req.method === "POST") {
    try {
      const { TaskTitle, TaskNotes, Category, Priority, DueDate } = req.body;

      if (!userId) {
        res.status(401).json({ error: "Unauthorized" });
        return;
      }

      // Add new task to Firestore using modular SDK
      const docRef = await addDoc(
        collection(firestore, "TaskManager", userId, "Tasks"),
        {
          TaskTitle,
          TaskNotes,
          Category,
          Priority,
          DueDate: Timestamp.fromDate(new Date(DueDate)), // Ensure the date is sent as a Firestore Timestamp
          isCompleted: false,
        }
      );
      res.status(201).json({ TaskID: docRef.id });
    } catch (error) {
      console.error("Error creating task:", error.message);
      res.status(500).json({ error: "Failed to create task" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
