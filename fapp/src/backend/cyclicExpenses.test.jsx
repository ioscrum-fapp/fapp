import moment from "moment";
import { expect, describe, it } from "vitest";
import { CYCLIC_TYPE, getClosestDateOfCyclicExpense } from "./cyclicExpenses";

const DAY_EXPENSE = {
  type: CYCLIC_TYPE.DAY,
  startDate: moment("2023-04-05").toISOString(),
};

const WEEK_EXPENSE = {
  type: CYCLIC_TYPE.WEEK,
  startDate: moment("2023-04-05").toISOString(),
};

const MONTH_EXPENSE = {
  type: CYCLIC_TYPE.MONTH,
  startDate: moment("2023-04-05").toISOString(),
};

describe("Cyclic expenses", () => {
  it("should return the next date as the same date when the type is DAY", () => {
    expect(
      getClosestDateOfCyclicExpense(DAY_EXPENSE, "2023-04-29").isSame(
        "2023-04-29",
        "day"
      )
    );
  });
  it("should return the next closest week when the type is week", () => {
    expect(
      getClosestDateOfCyclicExpense(WEEK_EXPENSE, "2023-04-29").isSame(
        "2023-05-03",
        "day"
      )
    );
  });
  it("should return the same day of the closest month when the type is month", () => {
    expect(
      getClosestDateOfCyclicExpense(MONTH_EXPENSE, "2023-04-29").isSame(
        "2023-05-05",
        "day"
      )
    );
    expect(
      getClosestDateOfCyclicExpense(MONTH_EXPENSE, "2023-04-01").isSame(
        "2023-04-05",
        "day"
      )
    );
  });
});
