import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  setDoc,
} from "@firebase/firestore";
import { db } from "./firebase";

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

  const ref = await addDoc(collection(db, EXPENSES_COLLECTION), expense);

  return ref.id;
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

  const ref = doc(db, EXPENSES_COLLECTION, expenseId);
  await setDoc(ref, expense);
}

export async function DeleteExpense(expenseId) {
  const ref = doc(collection(db, EXPENSES_COLLECTION), expenseId);
  await deleteDoc(ref);
}
