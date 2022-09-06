import { createContext, useReducer } from "react";
import { ADD_EXPENSE, DELETE_EXPENSE, SET_EXPENSES, UPDATE_EXPENSE } from "./types";
import uuid from "react-uuid";

export const ExpensesContext = createContext({
    expenses: [],
    setExpenses: (expenses) => { },
    addExpense: ({ description, ammount, date }) => { },
    deleteExpense: (id) => { },
    updateExpense: (id, { description, ammount, date }) => { },
});

const expensesReducer = (state, action) => {
    switch (action.type) {
        case SET_EXPENSES: {
            return [...action.payload]
        }
        case ADD_EXPENSE: {
            const id = uuid();
            const newExpense = { ...action.payload, id };
            return [...state, newExpense];
        };
        case UPDATE_EXPENSE: {
            const id = action.payload.id;
            const updatedExpense = action.payload.data;
            return state.map((expense) => expense.id === id ? updatedExpense : expense);
        };
        case DELETE_EXPENSE: {
            const id = action.payload;
            return state.filter((expense) => expense.id !== id);
        };
        default: return state;
    }
};

const ExpensesContextProvider = ({ children }) => {

    const [expensesState, dispatch] = useReducer(expensesReducer, []);

    const setExpenses = (expenses) => {
        dispatch({ type: SET_EXPENSES, payload: expenses });
    };

    const addExpense = (expensesData) => {
        dispatch({ type: ADD_EXPENSE, payload: expensesData })
    };

    const updateExpense = (id, expenseData) => {
        dispatch({ type: UPDATE_EXPENSE, payload: { id: id, data: expenseData } })
    };

    const deleteExpense = (id) => {
        dispatch({ type: DELETE_EXPENSE, payload: id })
    };

    const value = {
        expenses: expensesState,
        setExpenses: setExpenses,
        addExpense: addExpense,
        updateExpense: updateExpense,
        deleteExpense: deleteExpense,
    };

    return (
        <ExpensesContext.Provider value={value}>
            {children}
        </ExpensesContext.Provider>
    )
};

export default ExpensesContextProvider;