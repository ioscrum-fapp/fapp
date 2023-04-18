import moment from "moment";
import { v4 as uuid } from "uuid";

const BACKEND_URL = "http://localhost:3030/plannedExpenses/";

export async function createPlannedExpense(userId, value, date, isIncome) {
  const id = uuid();
  const expense = {
    id,
    userId,
    date: moment(date).toISOString(),
    isIncome,
  };

  await fetch(BACKEND_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(expense),
  });

  return id;
}

export async function updatePlannedExpense(id, attributes) {
  return fetch(BACKEND_URL + id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(attributes),
  });
}
