import {
    AUTH_USER,
    SET_ERRORS,
    START_LOADING_UI,
    STOP_LOADING_UI,
    UNAUTH_USER
} from "../types";
// others
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";


export const createUser = (userData) => dispatch => {
    console.log(userData)
    dispatch({
        type: START_LOADING_UI
    })
    axios.post(`/signup/`, userData)
        .then((res) => {
            authUser(res.data.token);
            dispatch({ type: AUTH_USER })
        })
        .then(() => dispatch({ type: STOP_LOADING_UI }))
        .catch((err) => {
            console.log(err);
            dispatch({
                type: STOP_LOADING_UI
            })
        })
};


export const loginUser = (userData) => dispatch => {
    dispatch({ type: START_LOADING_UI })
    axios.post(`/login/`, userData)
        .then((res) => {
            authUser(res.data.token);
            dispatch({ type: AUTH_USER })
        })
        .then(() => dispatch({ type: STOP_LOADING_UI }))
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
};

const authUser = (token) => {
    const FBIdToken = `Bearer ${token}`;
    AsyncStorage.setItem("token", FBIdToken);
    axios.defaults.headers.common["Authorization"] = FBIdToken;
}