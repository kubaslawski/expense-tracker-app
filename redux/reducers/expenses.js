
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
                expenses: [...state.expenses, action.payload]
            }
        case UPDATE_EXPENSE:
            id = action.payload.id;
            const updatedExpense = action.payload.updatedExpense;
            return {
                ...state,
                expenses: state.expenses.map((expense) => expense.id === id ? updatedExpense : expense)
            };
        case DELETE_EXPENSE:
            id = action.payload;
            return state.expenses.filter((expense) => expense !== id);
        default: return state;
    };
};