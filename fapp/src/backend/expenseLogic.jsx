import moment from "moment";
import { v4 as uuid } from "uuid";

const expensesRoute = "/expenses/";
const url = "http://localhost:3030/expenses/";

export default function CreateNewExpense(
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

  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(expense),
  }).then(() => {
    navigate(expensesRoute + newUuid);
  });
}
