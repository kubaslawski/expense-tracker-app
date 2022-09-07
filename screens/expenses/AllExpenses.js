import { useEffect } from "react";
// redux 
import { useSelector, useDispatch } from "react-redux";
// actions 
import { getExpenses } from "../../redux/actions/expenses";
// components 
import ExpensesOutput from "../../components/expenses/ExpensesOutput";

const AllExpenses = () => {

    const dispatch = useDispatch();
    const expenses = useSelector((state) => state.expenses.expenses);

    useEffect(() => {
        dispatch(getExpenses());
    }, [dispatch]);


    return (
        <ExpensesOutput expenses={expenses} expensesPeriod={"Total"} fallbackText={"No expenses registered"} />
    )
};

export default AllExpenses;