import React from "react";
import moment from "moment";
import useFetchJson from "../../hooks/useFetch";
import {
  CYCLIC_PROMPTS,
  getClosestDateOfCyclicExpense,
} from "../../backend/cyclicExpenses";

import "./PlannedExpenses.css";

const userId = 1;
const plannedExpensesUrl = `http://localhost:3030/plannedExpenses?userId=${userId}`;
const cyclicExpensesUrl = `http://localhost:3030/cyclicExpenses?userId=${userId}`;

const currency = "$";

export default function PlannedExpenses() {
  const {
    json: plannedExpenses,
    isFinished: plannedExpensesFinished,
    error: plannedExpensesError,
  } = useFetchJson(plannedExpensesUrl);
  const {
    json: cyclicExpenses,
    isFinished: cyclicExpensesFinished,
    error: cyclicExpensesError,
  } = useFetchJson(cyclicExpensesUrl);

  const plannedExpensesFromNow = plannedExpenses
    ?.map((e) => ({ ...e, date: moment(e.date) }))
    .filter((e) => e.date.isSameOrAfter(moment(), "day"));

  const cyclicExpensesFromNow = cyclicExpenses?.map((e) => ({
    ...e,
    date: getClosestDateOfCyclicExpense(e, moment()),
  }));

  const allPlannedExpenses = (plannedExpensesFromNow ?? [])
    .concat(cyclicExpensesFromNow ?? [])
    .sort((a, b) => a.date.valueOf() - b.date.valueOf());

  return (
    <div className="PlannedExpenses">
      {plannedExpensesFinished && cyclicExpensesFinished
        ? allPlannedExpenses.map((e) => (
            <div key={e.id} className="PlannedExpenseCard">
              <div className="ExpenseValue">
                {currency} {e.value.toFixed(2)}
              </div>
              <div className="ExpenseDate">{e.date.format("YYYY-MM-DD")}</div>
              {e.type && (
                <div className="ExpenseDate">
                  {CYCLIC_PROMPTS[e.type]}
                </div>
              )}
            </div>
          ))
        : "Loading..."}
      {plannedExpensesError ?? cyclicExpensesError}
    </div>
  );
}
