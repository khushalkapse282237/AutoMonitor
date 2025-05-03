import { db, auth } from "../Firebase/firebase-config";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";
import { sendPasswordResetEmail } from "firebase/auth";

// Get the current user's email
const getUserEmail = () => {
  const user = auth.currentUser;
  if (user) {
    return user.email;
  }
  throw new Error("No user is logged in.");
};

// ✅ Add Employee (Check if name exists before adding)
export const addEmployee = async (employeeData) => {
  try {
    const userEmail = getUserEmail();
    if (!userEmail) throw new Error("User email not found");

    const userRef = doc(db, "users", userEmail);
    const empRef = collection(userRef, "employees");

    // Check if an employee with the same name already exists
    const q = query(empRef, where("name", "==", employeeData.name));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      console.log("Employee already exists!");
      return { success: false, message: "Employee with this name already exists!" };
    }

    // Add the employee if they don’t exist
    await addDoc(empRef, employeeData);
    console.log("Employee added successfully!");
    return { success: true, message: "Employee added successfully!" };

  } catch (err) {
    console.error("Error adding employee:", err);
    return { success: false, message: "Error adding employee!" };
  }
};

// ✅ Get all employees under the current user's collection
export const getEmployees = async () => {
  try {
    const userEmail = getUserEmail();
    const empRef = collection(db, "users", userEmail, "employees");
    const querySnapshot = await getDocs(empRef);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (err) {
    console.error("Error fetching employees:", err);
  }
};

// ✅ Update Employee (Check name before updating)
export const updateEmployee = async (id, updatedData) => {
  try {
    const userEmail = getUserEmail();
    const empRef = doc(db, "users", userEmail, "employees", id);

    // Check if another employee has the same name
    if (updatedData.name) {
      const empCollection = collection(db, "users", userEmail, "employees");
      const q = query(empCollection, where("name", "==", updatedData.name));
      const querySnapshot = await getDocs(q);

      const duplicate = querySnapshot.docs.find((doc) => doc.id !== id);
      if (duplicate) {
        console.log("Employee with this name already exists!");
        return { success: false, message: "Employee with this name already exists!" };
      }
    }

    // Update the employee if the name is unique
    await updateDoc(empRef, updatedData);
    console.log("Employee updated successfully!");
    return { success: true, message: "Employee updated successfully!" };

  } catch (err) {
    console.error("Error updating employee:", err);
    return { success: false, message: "Error updating employee!" };
  }
};

// ✅ Delete Employee
export const deleteEmployee = async (id) => {
  try {
    const userEmail = getUserEmail();
    const empRef = doc(db, "users", userEmail, "employees", id);
    await deleteDoc(empRef);
    console.log("Employee deleted successfully!");
    return { success: true, message: "Employee deleted successfully!" };
  } catch (err) {
    console.error("Error deleting employee:", err);
    return { success: false, message: "Error deleting employee!" };
  }
};

// ✅ Reset Password
export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true, message: "Password reset email sent! Check your inbox." };
  } catch (err) {
    return { success: false, message: "Failed to send reset email. Please check the email address." };
  }
};
