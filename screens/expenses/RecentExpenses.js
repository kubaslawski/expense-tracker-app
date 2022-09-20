import { useEffect } from "react";
// components 
import ExpensesOutput from "../../components/expenses/ExpensesOutput";
// utils 
import { getDateMinusDays } from "../../util/date";
// redux 
import { useSelector, useDispatch } from "react-redux";
// actions 
import { getExpenses } from "../../redux/actions/expenses";
import IsLoadingHOC from "../../hoc/isLoading";

const RecentExpenses = () => {

    const dispatch = useDispatch();
    const expenses = useSelector((state) => state.expenses.expenses);

    useEffect(() => {
        dispatch(getExpenses());
    }, []);

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

export default IsLoadingHOC(RecentExpenses);