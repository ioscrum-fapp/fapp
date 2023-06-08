import React from "react";
import moment from "moment";
import { Timestamp, where } from "@firebase/firestore";
import {
  CYCLIC_EXPENSES_COLLECTION,
  CYCLIC_PROMPTS,
  getClosestDateOfCyclicExpense,
} from "../../backend/cyclicExpenses";
import "./PlannedExpenses.css";
import { PLANNED_EXPENSES_COLLECTION } from "../../backend/plannedExpenses";
import useCollection from "../../hooks/useCollection";

const currency = "$";

export default function PlannedExpenses() {
  const [plannedExpenses, plannedExpensesFinished, plannedExpensesError] =
    useCollection(
      PLANNED_EXPENSES_COLLECTION,
      where(
        "date",
        ">=",
        Timestamp.fromMillis(moment().startOf("day").valueOf())
      )
    );
  const [cyclicExpenses, cyclicExpensesFinished, cyclicExpensesError] =
    useCollection(CYCLIC_EXPENSES_COLLECTION);

  const plannedExpensesFromNow = plannedExpenses?.docs.map((e) => {
    const { id } = e;
    const data = e.data();
    return {
      ...data,
      id,
      date: moment(
        new Timestamp(data.date.seconds, data.date.nanoseconds).toDate()
      ),
    };
  });

  const cyclicExpensesFromNow = cyclicExpenses?.docs.map((e) => {
    const { id } = e;
    const data = e.data();
    const res = {
      ...data,
      startDate: moment(
        new Timestamp(
          data.startDate.seconds,
          data.startDate.nanoseconds
        ).toDate()
      ),
      id,
    };

    const date = getClosestDateOfCyclicExpense(res, moment());

    return {
      ...res,
      date,
    };
  });

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
                <div className="ExpenseDate">{CYCLIC_PROMPTS[e.type]}</div>
              )}
            </div>
          ))
        : "Loading..."}
      {plannedExpensesError?.toString() ?? cyclicExpensesError?.toString()}
    </div>
  );
}
