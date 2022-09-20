import {
    DATA_FETCHING_ERROR,
    START_LOADING_UI,
    STOP_LOADING_UI,
    SET_ERRORS
} from "../types";

const initialState = {
    errorMessage: null,
    isLoading: false,
    errors: null,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case DATA_FETCHING_ERROR:
            return {
                ...state,
                errorMessage: action.payload,
            };
        case START_LOADING_UI:
            return {
                ...state,
                isLoading: true,
            }
        case STOP_LOADING_UI:
            return {
                ...state,
                isLoading: false
            }
        case SET_ERRORS: {
            return {
                ...state,
                isLoading: false,
                errorMessage: action.payload
            }
        }
        default: return state;
    }
}