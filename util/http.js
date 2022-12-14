import axios from "axios";

const BASE_URL = "https://expense-tracker-app-6e4c5-default-rtdb.europe-west1.firebasedatabase.app";


export const getExpenses = async () => {
    const response = await axios.get(`${BASE_URL}/expenses.json`);
    const expenses = [];
    for (const key in response.data) {
        const expenseObj = {
            id: key,
            ammount: response.data[key].ammount,
            date: new Date(response.data[key].date),
            description: response.data[key].description,
        };
        expenses.push(expenseObj);
    };
    return expenses;
};


export const addExpense = async (expenseData) => {
    const response = await axios.post(`${BASE_URL}/expenses.json/`, expenseData);
    const id = response.data.name;
    return id;
};

export const updateExpense = (id, expenseData) => {
    return axios.put(`${BASE_URL}/expenses/${id}.json/`, expenseData);
};

export const deleteExpense = (id) => {
    return axios.delete(`${BASE_URL}/expenses/${id}.json/`);
};

