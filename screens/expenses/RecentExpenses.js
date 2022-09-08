import { useContext, useEffect, useState } from "react";
// components 
import ExpensesOutput from "../../components/expenses/ExpensesOutput";
import ErrorOverlay from "../../components/ui/ErrorOverlay";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
// context 
import { ExpensesContext } from "../../store/expenses-context";
import { getDateMinusDays } from "../../util/date";
// redux 
import { useSelector, useDispatch } from "react-redux";
// actions 
import { getExpenses } from "../../redux/actions/expenses";

const RecentExpenses = () => {

    const dispatch = useDispatch();
    const expenses = useSelector((state) => state.expenses.expenses);

    useEffect(() => {
        dispatch(getExpenses());
    }, [dispatch]);

    const recentExpenses = expenses.filter((expense) => {
        const today = new Date();
        const date7DaysAgo = getDateMinusDays(today, 7);
        return expense.date > date7DaysAgo;
    });

    return (
        <ExpensesOutput
            expenses={recentExpenses}
            expensesPeriod={"Last 7 days"}
            fallbackText={"No expenses registered"}
        />
    );
};

export default RecentExpenses;