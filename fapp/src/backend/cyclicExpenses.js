import moment from "moment";
import { v4 as uuid } from "uuid";

const BACKEND_URL = "http://localhost:3030/cyclicExpenses/";

export const CYCLIC_TYPE = Object.freeze({
  DAY: "day",
  WEEK: "week",
  MONTH: "month",
});

export async function createCyclicExpense(
  userId,
  value,
  startDate,
  cyclicType,
  isIncome
) {
  const id = uuid();
  const expense = {
    id,
    userId,
    value,
    startDate: moment(startDate).toISOString(),
    type: cyclicType,
    isIncome,
  };

  await fetch(BACKEND_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(expense),
  });

  return id;
}

export async function updateCyclicExpense(expenseId, expenseAttributes) {
  return fetch(BACKEND_URL + expenseId, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(expenseAttributes),
  });
}

export function getClosestDateOfExpense(expense, dateFrom) {
  const type = expense.cyclicType;
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
        throw new Error(`Unsupported cyclic expense type "${type}"`)
    }
  }

  return res;
}
