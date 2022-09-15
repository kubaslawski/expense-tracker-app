import {
    SET_EXPENSES,
    ADD_EXPENSE,
    UPDATE_EXPENSE,
    DELETE_EXPENSE,
    DATA_FETCHING_ERROR,
    SET_EXPENSE,
    START_LOADING_UI
} from "../types";
import axios from "axios";
import { BASE_URL } from "../../App";

export const getExpenses = () => dispatch => {
    dispatch({
        type: START_LOADING_UI,
        message: "Fetching data..."
    })
    axios.get(`${BASE_URL}/expenses.json/`)
        .then((res) => {
            const expenses = [];
            for (const key in res.data) {
                const expenseObj = {
                    id: key,
                    ammount: res.data[key].ammount,
                    date: new Date(res.data[key].date),
                    description: res.data[key].description,
                };
                expenses.push(expenseObj);
            };
            dispatch({
                type: SET_EXPENSES,
                payload: expenses
            })
        })
        .catch(() => dispatch({
            type: DATA_FETCHING_ERROR,
            payload: "Error fetching data, please try again later."
        }))
};

export const getExpense = (id) => dispatch => {
    axios.get(`${BASE_URL}/expenses/${id}.json/`)
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
    axios.post(`${BASE_URL}/expenses.json/`, expenseData)
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
        .catch(() => {
            dispatch({
                type: DATA_FETCHING_ERROR,
                payload: "Could not add new expense, please try again later."
            });
        })
};

export const updateExpense = (id, expenseData) => dispatch => {
    axios.put(`${BASE_URL}/expenses/${id}.json/`, expenseData)
        .then(() => {
            const expenseObj = {
                ...expenseData,
                id: id,
            };
            dispatch({
                type: UPDATE_EXPENSE,
                payload: expenseObj,
            });
        })
        .catch(() => {
            dispatch({
                type: DATA_FETCHING_ERROR,
                payload: "Could not update expense, please try again later."
            });
        })
};

export const deleteExpense = (id) => dispatch => {
    axios.delete(`${BASE_URL}/expenses/${id}.json/`)
        .then(() => {
            dispatch({
                type: DELETE_EXPENSE,
                payload: id,
            });
        })
        .catch(() => {
            dispatch({
                type: DATA_FETCHING_ERROR,
                payload: "Could not delete expense, please try again later."
            });
        })
};