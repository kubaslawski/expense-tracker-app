
import {
    ADD_EXPENSE,
    DELETE_EXPENSE,
    SET_EXPENSE,
    SET_EXPENSES,
    UPDATE_EXPENSE,
} from "../types";

const initialState = {
    expenses: [],
    expense: {
        id: "",
        ammount: "",
        date: new Date(Date.now()),
        description: "",
    },
    errorMessage: null,
};

export default function (state = initialState, action) {
    let id;
    switch (action.type) {
        case SET_EXPENSES:
            return {
                ...state,
                expenses: action.payload
            };
        case SET_EXPENSE:
            return {
                ...state,
                expense: action.payload,
            }
        case ADD_EXPENSE:
            return {
                ...state,
                expenses: [action.payload, ...state.expenses]
            }
        case UPDATE_EXPENSE:
            id = action.payload.id;
            const updatedExpense = action.payload;
            return {
                ...state,
                expenses: state.expenses.map((expense) => expense.id === id ? updatedExpense : expense)
            };
        case DELETE_EXPENSE:
            id = action.payload;
            return {
                ...state,
                expenses: state.expenses.filter((expense) => expense.id !== id)
            };
        default: return state;
    };
};