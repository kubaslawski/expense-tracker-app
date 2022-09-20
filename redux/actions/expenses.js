import {
    SET_EXPENSES,
    ADD_EXPENSE,
    UPDATE_EXPENSE,
    DELETE_EXPENSE,
    DATA_FETCHING_ERROR,
    SET_EXPENSE,
    START_LOADING_UI,
    STOP_LOADING_UI
} from "../types";
import axios from "axios";

export const getExpenses = () => dispatch => {
    dispatch({
        type: START_LOADING_UI,
        message: "Fetching data..."
    })
    axios.get(`expenses/`)
        .then((res) => {
            const expenses = [];
            for (const key in res.data) {
                const expenseObj = {
                    expenseId: res.data[key].expenseId,
                    ammount: res.data[key].ammount,
                    date: new Date(res.data[key].date),
                    description: res.data[key].description,
                    userId: res.data[key].userId,
                };
                expenses.push(expenseObj);
            };
            dispatch({
                type: SET_EXPENSES,
                payload: expenses
            });
        })
        .then(() => dispatch({ type: STOP_LOADING_UI }))
        .catch(() => dispatch({
            type: DATA_FETCHING_ERROR,
            payload: "Error fetching data, please try again later."
        }))
};

export const getExpense = (id) => dispatch => {
    axios.get(`expenses/${id}/`)
        .then((res) => {
            dispatch({
                type: SET_EXPENSE,
                payload: {
                    id: id,
                    ...res.data
                }
            })
        })
        .catch(() => dispatch({
            type: DATA_FETCHING_ERROR,
            payload: "Error fetching data, please try again later.",
        }))
};

export const addExpense = (expenseData) => dispatch => {
    dispatch({ type: START_LOADING_UI })
    axios.post(`expenses/`, expenseData)
        .then((res) => {
            const expenseObj = {
                ...expenseData,
                id: res.data.name,
            };
            dispatch({
                type: ADD_EXPENSE,
                payload: expenseObj
            });
        })
        .then(() => dispatch({ type: STOP_LOADING_UI }))
        .catch(() => {
            dispatch({
                type: DATA_FETCHING_ERROR,
                payload: "Could not add new expense, please try again later."
            });
        })
};

export const updateExpense = (expenseId, expenseData) => dispatch => {
    dispatch({ type: START_LOADING_UI })
    axios.put(`/expenses/${expenseId}/`, expenseData)
        .then((res) => {
            dispatch({
                type: UPDATE_EXPENSE,
                payload: res.data,
            });
        })
        .then(() => dispatch({ type: STOP_LOADING_UI }))
        .catch(() => {
            dispatch({
                type: DATA_FETCHING_ERROR,
                payload: "Could not update expense, please try again later."
            });
        })
};

export const deleteExpense = (expenseId) => dispatch => {
    dispatch({ type: START_LOADING_UI })
    axios.delete(`/expenses/${expenseId}/`)
        .then(() => {
            dispatch({
                type: DELETE_EXPENSE,
                payload: expenseId,
            });
        })
        .then(() => dispatch({ type: STOP_LOADING_UI }))
        .catch(() => {
            dispatch({
                type: DATA_FETCHING_ERROR,
                payload: "Could not delete expense, please try again later."
            });
        })
};