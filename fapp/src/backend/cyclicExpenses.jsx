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

export const CYCLIC_EXPENSES_COLLECTION = "cyclicExpenses";

export const CYCLIC_TYPE = Object.freeze({
  DAY: "day",
  WEEK: "week",
  MONTH: "month",
});

export const CYCLIC_PROMPTS = Object.freeze({
  [CYCLIC_TYPE.DAY]: "Repeats every day",
  [CYCLIC_TYPE.WEEK]: "Repeats every week",
  [CYCLIC_TYPE.MONTH]: "Repeats every month",
});

export async function createCyclicExpense(
  userId,
  value,
  startDate,
  cyclicType,
  isIncome
) {
  const expense = {
    userId,
    value,
    startDate: Timestamp.fromDate(new Date(startDate)),
    type: cyclicType,
    isIncome,
  };

  const ref = await addDoc(collection(db, CYCLIC_EXPENSES_COLLECTION), expense);

  return ref.id;
}

export async function updateCyclicExpense(expenseId, expenseAttributes) {
  await updateDoc(
    doc(db, CYCLIC_EXPENSES_COLLECTION, expenseId),
    expenseAttributes
  );
}

export async function deleteCyclucExpense(expenseId) {
  await deleteDoc(doc(db, CYCLIC_EXPENSES_COLLECTION, expenseId));
}

export function getClosestDateOfCyclicExpense(expense, dateFrom) {
  const { type } = expense;
  if (type === CYCLIC_TYPE.DAY) {
    return moment(dateFrom).startOf("day");
  }

  const startDate = moment(expense.startDate);

  let res = startDate.clone();
  let i = 0;

  while (res.isBefore(dateFrom, "day")) {
    i += 1;
    switch (type) {
      case CYCLIC_TYPE.WEEK:
        res = startDate.clone().add(7 * i, "days");
        break;
      case CYCLIC_TYPE.MONTH:
        res = startDate.clone().add(i, "months");
        break;
      default:
        throw new Error(`Unsupported cyclic expense type "${type}"`);
    }
  }

  return res;
}
