import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  setDoc,
} from "@firebase/firestore";
import { db, fileStorage, ref, uploadBytes } from "./firebase";

export const EXPENSES_COLLECTION = "expenses";

export async function CreateNewExpense(
  userId,
  value,
  date,
  tags,
  accountId,
  isIncome
) {
  const expense = {
    userId,
    value,
    date: Timestamp.fromDate(new Date(date)),
    tags,
    accountId,
    isIncome,
  };

  const newRef = await addDoc(collection(db, EXPENSES_COLLECTION), expense);

  return newRef.id;
}

export async function EditExpense(
  userId,
  value,
  date,
  tags,
  accountId,
  expenseId,
  isIncome
) {
  const expense = {
    userId,
    value,
    date: Timestamp.fromDate(new Date(date)),
    tags,
    accountId,
    isIncome,
  };

  const newRef = doc(db, EXPENSES_COLLECTION, expenseId);
  await setDoc(newRef, expense);
}

export async function DeleteExpense(expenseId) {
  const newRef = doc(collection(db, EXPENSES_COLLECTION), expenseId);
  await deleteDoc(newRef);
}
export async function saveFile(fileToUpload,newId,uid){
  try {
    const storageRef = ref(
      fileStorage,
      `clients/${uid}/${newId}/${fileToUpload.name}`
    );
    await uploadBytes(storageRef, fileToUpload);
  } catch (error) {
    alert("Error uploading file:", error);
  }
};