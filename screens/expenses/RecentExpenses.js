import { useContext, useEffect, useState } from "react";
// components 
// import ExpensesOutput from "../components/expenses/ExpensesOutput";
import ExpensesOutput from "../../components/expenses/ExpensesOutput";
import ErrorOverlay from "../../components/ui/ErrorOverlay";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
// context 
import { ExpensesContext } from "../../store/expenses-context";
import { getDateMinusDays } from "../../util/date";
import { getExpenses } from "../../util/http";

const RecentExpenses = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();
    const expensesContext = useContext(ExpensesContext);

    useEffect(() => {
        const getExpensesFunction = async () => {
            setIsLoading(true);
            try {
                const expenses = await getExpenses();
                expensesContext.setExpenses(expenses);
            } catch (error) {
                setError("Could not fetch expenses");
            }
            setIsLoading(false);
        }
        getExpensesFunction();
    }, [])

    const recentExpenses = expensesContext.expenses.filter((expense) => {
        const today = new Date();
        const date7DaysAgo = getDateMinusDays(today, 7);
        return expense.date > date7DaysAgo;
    });

    const errorHandler = () => {
        setError(null);
    };

    if (error && !isLoading) {
        return <ErrorOverlay
            message={error}
            onConfirm={errorHandler}
        />;
    };

    if (isLoading) {
        return <LoadingSpinner />;
    };

    return (
        <ExpensesOutput expenses={recentExpenses} expensesPeriod={"Last 7 days"} fallbackText={"No expenses registered"} />
    );
};

export default RecentExpenses;