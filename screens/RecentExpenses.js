import { useContext, useEffect, useState } from "react";
// components 
import ExpensesOutput from "../components/expenses/ExpensesOutput";
import LoadingSpinner from "../components/ui/LoadingSpinner";
// context 
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";
import { getExpenses } from "../util/http";

const RecentExpenses = () => {

    const [isLoading, setIsLoading] = useState(true);
    const expensesContext = useContext(ExpensesContext);

    useEffect(() => {
        const getExpensesFunction = async () => {
            setIsLoading(true);
            const expenses = await getExpenses();
            expensesContext.setExpenses(expenses);
            setIsLoading(false);
        }
        getExpensesFunction();
    }, [])

    const recentExpenses = expensesContext.expenses.filter((expense) => {
        const today = new Date();
        const date7DaysAgo = getDateMinusDays(today, 7);
        return expense.date > date7DaysAgo;
    });

    if (isLoading) {
        return <LoadingSpinner />
    }

    return (
        <ExpensesOutput expenses={recentExpenses} expensesPeriod={"Last 7 days"} fallbackText={"No expenses registered"} />
    )
};

export default RecentExpenses;