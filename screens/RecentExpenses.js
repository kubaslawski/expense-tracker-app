import { useContext } from "react";
// components 
import ExpensesOutput from "../components/expenses/ExpensesOutput";
// context 
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";

const RecentExpenses = () => {

    const expensesContext = useContext(ExpensesContext);
    const recentExpenses = expensesContext.expenses.filter((expense) => {
        const today = new Date();
        const date7DaysAgo = getDateMinusDays(today, 7);
        return expense.date > date7DaysAgo;
    })

    return (
        <ExpensesOutput expenses={recentExpenses} expensesPeriod={"Last 7 days"} fallbackText={"No expenses registered"} />
    )
};

export default RecentExpenses;