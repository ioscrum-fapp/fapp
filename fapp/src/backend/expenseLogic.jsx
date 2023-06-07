import moment from "moment";
import { v4 as uuid } from "uuid";

const expensesRoute = "/expenses/";
const BACKEND_URL = "http://localhost:3030/expenses/";

export const EXPENSES_COLLECTION = "expenses";

export function CreateNewExpense(
  navigate,
  userId,
  value,
  date,
  tags,
  accountId
) {
  const newUuid = uuid();
  const expense = {
    id: newUuid,
    user_id: userId,
    value,
    date: moment(date).toISOString(),
    tags,
    accountId,
  };

  fetch(BACKEND_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(expense),
  }).then(() => {
    navigate(expensesRoute + newUuid);
  });
}

export function EditExpense(
    navigate,
    userId,
    value,
    date,
    tags,
    accountId,
    expenseId
) {
  const expense = {
    id: expenseId,
    user_id: userId,
    value,
    date: moment(date).toISOString(),
    tags,
    accountId,
  };

  fetch(BACKEND_URL + expenseId, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(expense),
  }).then(() => {
    navigate(expensesRoute + expenseId);
  });
}

export async function DeleteExpense(expenseId) {
  return fetch(BACKEND_URL + expenseId, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
}
