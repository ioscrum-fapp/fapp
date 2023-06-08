import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "@firebase/firestore";
import moment from "moment";
import { v4 as uuid } from "uuid";
import { db } from "./firebase";

export const PLANNED_EXPENSES_COLLECTION = "plannedExpenses";

export async function createPlannedExpense(userId, value, date, isIncome) {
  const expense = {
    userId,
    value,
    date: Timestamp.fromDate(new Date(date)),
    isIncome,
  };

  const ref = await addDoc(
    collection(db, PLANNED_EXPENSES_COLLECTION),
    expense
  );

  return ref.id;
}

export async function updatePlannedExpense(id, attributes) {
  await updateDoc(doc(db, PLANNED_EXPENSES_COLLECTION, id), attributes);
}

export async function deletePlannedExpense(expenseId) {
  await deleteDoc(doc(db, PLANNED_EXPENSES_COLLECTION, expenseId));
}
