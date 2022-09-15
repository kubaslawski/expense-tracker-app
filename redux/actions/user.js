import {
    CREATE_USER,
    AUTH_USER,
    SET_ERRORS,
    START_LOADING_UI,
    STOP_LOADING_UI,
    UNAUTH_USER
} from "../types";
// others
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_KEY = "AIzaSyABShBaGzFroJ7OiJG9zEWVlVsjOQ4XAI8";

export const createUser = (userData) => dispatch => {
    dispatch({
        type: START_LOADING_UI
    })
    axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`, {
        ...userData,
        returnSecureToken: true,
    })
        .then((res) => {
            dispatch({
                type: AUTH_USER,
                payload: res.data.idToken
            });
            dispatch({
                type: STOP_LOADING_UI
            });
        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: STOP_LOADING_UI
            })
        })
};


export const loginUser = (userData) => dispatch => {
    axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`, userData)
        .then((res) => {
            const token = res.data.idToken;
            dispatch({
                type: AUTH_USER,
                payload: token
            })
            AsyncStorage.setItem('token', token);
            dispatch({ type: STOP_LOADING_UI })
        })
        .catch((err) => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data.error.message
            })
        })
};

export const logoutUser = () => dispatch => {
    dispatch({
        type: START_LOADING_UI,
    });
    AsyncStorage.removeItem("token");
    dispatch({
        type: UNAUTH_USER
    });
    dispatch({
        type: STOP_LOADING_UI
    });
}

