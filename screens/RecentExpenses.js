import { useContext, useEffect } from "react";
// components 
import ExpensesOutput from "../components/expenses/ExpensesOutput";
// context 
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";
import { getExpenses } from "../util/http";

const RecentExpenses = () => {

    const expensesContext = useContext(ExpensesContext);

    useEffect(() => {
        const getExpensesFunction = async () => {
            const expenses = await getExpenses();
            expensesContext.setExpenses(expenses);
        }
        getExpensesFunction();
    }, [])

    const recentExpenses = expensesContext.expenses.filter((expense) => {
        const today = new Date();
        const date7DaysAgo = getDateMinusDays(today, 7);
        return expense.date > date7DaysAgo;
    });

    return (
        <ExpensesOutput expenses={recentExpenses} expensesPeriod={"Last 7 days"} fallbackText={"No expenses registered"} />
    )
};

export default RecentExpenses;