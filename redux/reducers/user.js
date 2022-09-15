import { AUTH_USER, UNAUTH_USER, CREATE_USER } from "../types";

const initialState = {
    isAuthenticated: false,
    token: "",
}


export default function (state = initialState, action) {
    switch (action.type) {
        case AUTH_USER:
            return {
                ...state,
                isAuthenticated: true,
                token: action.payload,
            }
        case UNAUTH_USER:
            return initialState;
        default: return state;
    }
}