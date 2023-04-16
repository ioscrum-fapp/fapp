import moment from "moment";
import { expect, describe, it } from "vitest";
import { CYCLIC_TYPE, getClosestDateOfExpense } from "./cyclicExpenses";

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
      getClosestDateOfExpense(DAY_EXPENSE, "2023-04-29").isSame(
        "2023-04-29",
        "day"
      )
    );
  });
  it("should return the next closest week when the type is week", () => {
    expect(
      getClosestDateOfExpense(WEEK_EXPENSE, "2023-04-29").isSame(
        "2023-05-03",
        "day"
      )
    );
  });
  it("should return the same day of the closest month when the type is month", () => {
    expect(
      getClosestDateOfExpense(MONTH_EXPENSE, "2023-04-29").isSame(
        "2023-05-05",
        "day"
      )
    );
    expect(
      getClosestDateOfExpense(MONTH_EXPENSE, "2023-04-01").isSame(
        "2023-04-05",
        "day"
      )
    );
  });
});
