import { useContext } from "react";
// components 
import ExpensesOutput from "../components/expenses/ExpensesOutput";
// context 
import { ExpensesContext } from "../store/expenses-context";

const AllExpenses = () => {
    const expensesContext = useContext(ExpensesContext);

    return (
        <ExpensesOutput expenses={expensesContext.expenses} expensesPeriod={"Total"} />
    )
};

export default AllExpenses;