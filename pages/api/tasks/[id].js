import { firestore } from "../../../firebase";
import {
  Timestamp,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

export default async (req, res) => {
  const { id, userId } = req.query; // Extract userId from query parameters

  // Get a Task by ID
  if (req.method === "GET") {
    try {
      const doc = await collection("tasks").doc(id).get();

      if (!doc.exists) {
        res.status(404).json({ error: "Task not found" });
        return;
      }

      const data = doc.data();
      const task = {
        TaskID: doc.id,
        ...data,
        DueDate: data.DueDate.toDate(), // Convert Firestore Timestamp to JavaScript Date
      };

      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch task" });
    }
  }
  // Update a task by ID
  else if (req.method === "PUT") {
    try {
      const { TaskTitle, TaskNotes, Category, Priority, DueDate, isCompleted } =
        req.body;

      if (!userId || !id) {
        res.status(400).json({ error: "Missing userId or task ID" });
        return;
      }

      //Tasks should be documents in a subcollection of a document of the User
      const taskRef = doc(firestore, "TaskManager", userId, "Tasks", id);

      // Convert DueDate to a Firestore Timestamp
      const dueDate = new Date(DueDate);
      const dueDateTimestamp = Timestamp.fromDate(dueDate);

      await updateDoc(taskRef, {
        TaskTitle,
        TaskNotes,
        Category,
        Priority,
        DueDate: dueDateTimestamp,
        isCompleted,
      });

      res.status(200).json({
        TaskID: id,
        TaskTitle,
        TaskNotes,
        Category,
        Priority,
        DueDate,
        isCompleted,
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to update task" });
    }
  }
  // Delete a task by ID
  else if (req.method === "DELETE") {
    try {
      const taskRef = doc(firestore, "TaskManager", userId, "Tasks", id);

      await deleteDoc(taskRef);
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete task" });
    }
  } else {
    res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
