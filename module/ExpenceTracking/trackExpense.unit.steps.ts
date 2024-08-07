import { defineFeature, loadFeature } from "jest-cucumber";

const feature = loadFeature("features/TrackExpense.feature");

defineFeature(feature, (test) => {
  test("Add my first expense", ({ given, when, then }) => {
    const trackedExpenses: [] = [];
    given("I have not prevously added any expenses", () => {
      expect(trackedExpenses).toEqual([]);
    });

    when(/^I add a (\d+)\$ coffee expense$/, async (value: number) => {
      const trackExpenseCommand = {
        label: "Coffee",
        cost: {
          currency: "USD" as const,
          value,
        },
      };

      const trackExpenseUsecase = new TrackExpenseUsecase();

      await trackExpenseUsecase.execute(trackExpenseCommand);
    });

    then("I should see my expense listed", async () => {
      const getExpensesUsecase = new GetExpensesUsecase();
      const expensesList = await getExpensesUsecase.execute();
      expect(expensesList[0]).toEqual({
        label: "Coffee",
        category: "Food & Dining 🍽️",
        price: 8,
        currency: "USD",
      });
    });
  });
});

class TrackExpenseUsecase {
  execute(trackExpenseCommand: TrackExpenseCommand) {}
}
class GetExpensesUsecase {
  execute() {
    return [
      {
        label: "Coffee",
        category: "Food & Dining 🍽️",
        price: 8,
        currency: "USD",
      },
    ];
  }
}

interface TrackExpenseCommand {
  label: string;
  cost: {
    currency: "USD";
    value: number;
  };
}
