import { createContext, useReducer } from "react";
import { ADD_EXPENSE, DELETE_EXPENSE, UPDATE_EXPENSE } from "./types";
import uuid from "react-uuid";

const DUMMY_EXPENSES = [
    {
        id: "1",
        description: "A pair of shoes",
        ammount: 59.99,
        date: new Date("2022-08-30")
    },
    {
        id: "2",
        description: "A pair of trousers",
        ammount: 32.99,
        date: new Date("2022-04-19")
    },
    {
        id: "3",
        description: "Bananas",
        ammount: 1.99,
        date: new Date("2022-08-10")
    },
    {
        id: "4",
        description: "A book",
        ammount: 9.99,
        date: new Date("2022-05-15")
    },
    {
        id: "5",
        description: "A book",
        ammount: 12.99,
        date: new Date("2022-05-17")
    },
]

export const ExpensesContext = createContext({
    expenses: [],
    addExpense: ({ description, ammount, date }) => { },
    deleteExpense: (id) => { },
    updateExpense: (id, { description, ammount, date }) => { },
});

const expensesReducer = (state, action) => {
    switch (action.type) {
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

    const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

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